import React, { useEffect, useMemo, useState } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor';
import type { RcFile } from 'antd/lib/upload/interface';
import classNames from 'classnames';
import '@wangeditor/editor/dist/css/style.css';
import storage from '@/utils/storage';
import { TOKEN } from '@/constants'; // 引入 css

type InsertFnType = (url: string, alt?: string, href?: string) => void;

export type IEditorProps = Partial<
  {
    className?: string;
    editorMode?: 'page' | 'text';
    value?: string;
    width?: string;
    style?: React.CSSProperties;
    placeholder?: string | string[];
    onChange?: (value?: string) => void;
    action?:
      | string
      | ((file: RcFile) => string)
      | ((file: RcFile) => PromiseLike<string>);
    fieldProps?: {
      /**
       * mode: 'default' 默认模式 - 集成了 wangEditor 所有功能
       * mode: 'simple' 简洁模式 - 仅有部分常见功能，但更加简洁易用
       */
      mode?: 'default' | 'simple';
      toolbar?: Partial<IToolbarConfig>;
    };
  } & Omit<
    IEditorConfig,
    'EXTEND_CONF' | 'MENU_CONF' | 'onCreated' | 'onChange'
  >
>;

const WangEditor = (props: IEditorProps) => {
  const {
    value,
    onChange,
    editorMode,
    action,
    className,
    placeholder,
    fieldProps = {
      mode: 'default',
    },
    ...rest
  } = props;
  const { mode, toolbar } = fieldProps;
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // 存储 editor 实例
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const toolbarConfig: Partial<IToolbarConfig> = Object.assign(
    {
      /* 工具栏配置 */
      excludeKeys: ['fullScreen'],
    },
    toolbar,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: placeholder || '请输入内容...',
    onCreated(editorCase: IDomEditor) {
      setEditor(editorCase);
    }, // 记录下 editor 实例，重要！
    MENU_CONF: {},
    onFocus: () => {
      setIsFocus(true);
    },
    onBlur: () => {
      setIsFocus(false);
    },
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor === null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const toolBarDom = useMemo(() => {
    return (
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={
          props?.editorMode === 'page' ? {} : { borderBottom: '1px solid #ccc' }
        }
      />
    );
  }, [editor, props?.editorMode, toolbarConfig]);

  const defaultConfig = useMemo(() => {
    const _editorConfig = {
      ...editorConfig,
      ...rest,
    };
    if (action) {
      // @ts-ignore
      _editorConfig.MENU_CONF.uploadImage = {
        server: action, // 必填，否则上传图片会报错。
        // form-data fieldName ，默认值 'wangeditor-uploaded-image'
        fieldName: 'file',
        // 自定义增加 http  header
        headers: {
          Authorization: `Bearer ${storage.get(TOKEN)}`.replace(/"/g, ''),
        },

        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 2 * 1024 * 1024, // 2M

        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 10,

        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['image/*'],

        // 超时时间，默认为 10 秒
        timeout: 5 * 1000, // 5 秒
        // 自定义插入图片
        customInsert(res: any, insertFn: InsertFnType) {
          // res 即服务端的返回结果
          console.log('res:', res);
          const { relativePath, url, name, data } = res;
          if (data) {
            // 从 res 中找到 url alt href ，然后插图图片
            insertFn(data, name || 'alt', data);
          } else {
            const imageUrl = APP_API_HOST + '/' + relativePath || url;
            // 从 res 中找到 url alt href ，然后插图图片
            insertFn(imageUrl, name || 'alt', imageUrl);
          }
        },
        // 上传之前触发
        onBeforeUpload(file: RcFile) {
          // file 选中的文件，格式如 { key: file }
          console.log('file:', file);
          return file;

          // 可以 return
          // 1. return file 或者 new 一个 file ，接下来将上传
          // 2. return false ，不上传这个 file
        },
        // 上传进度的回调函数
        onProgress(progress: number) {
          // progress 是 0-100 的数字
          console.log('progress', progress);
        },
        // 单个文件上传成功之后
        onSuccess(file: File, res: any) {
          console.log(`${file.name} 上传成功`, res);
        },
        // 单个文件上传失败
        onFailed(file: File, res: any) {
          console.log(`${file.name} 上传失败`, res);
        },
        // 上传错误，或者触发 timeout 超时
        onError(file: File, err: any, res: any) {
          console.log(`${file.name} 上传出错`, err, res);
        },
      };
    }
    return _editorConfig;
  }, [editorConfig, action, rest]);

  const editorDom = useMemo(() => {
    return (
      <Editor
        defaultConfig={defaultConfig}
        defaultHtml={value || '<p></p>'}
        value={value}
        onCreated={(editor: IDomEditor) => setEditor(editor)}
        onChange={(editor: IDomEditor) => {
          if (editor.getHtml() === '<p><br></p>') onChange?.(undefined);
          onChange?.(editor.getHtml());
        }}
        mode={mode}
        className={classNames('', {
          ['editor-container']: editorMode !== 'page',
        })}
        {...rest}
      />
    );
  }, [defaultConfig, value, onChange, editorMode, mode, rest]);

  if (editorMode && editorMode === 'page') {
    return (
      <>
        <div className={'toolbar-container'}>{toolBarDom}</div>
        <div className={'editor-content'}>
          <div className={'editor-container'}>{editorDom}</div>
        </div>
      </>
    );
  }
  return (
    <div
      className={classNames('editor-warp', className, {
        focus: isFocus,
      })}
    >
      {toolBarDom}
      {editorDom}
    </div>
  );
};

export default WangEditor;
