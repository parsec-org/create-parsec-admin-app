# ProFormEditor 富文本编辑器

本组件是基于 [wangEditor 5](https://www.wangeditor.com/) 进行了统一的封装处理，方便在项目中使用；

相关文档请到官网进行查阅

TODO: 继续完善

## 使用

1、结合 Pro 的 FormItem 使用

```tsx
import ProForm from '@ant-design/pro-form';
import Editor from '@/components/ProFormEditor/Editor';

<ProForm.Item
  name={'content2'}
  label={'文章内容'}
  rules={[
    {
      required: true,
      message: `请编辑文章内容`,
      validator: (_, value, callback) => {
        console.log('content:', value.isEmpty());
        if (value.isEmpty()) {
          callback(`请编辑文章内容`);
        } else {
          callback();
        }
      },
    },
  ]}
>
  <Editor
    className={styles.braftEditor}
    placeholder={'请编辑文章内容...'}
    action={`${REACT_APP_API_HOST}/common/aliyunoss`}
  />
</ProForm.Item>;
```

2、直接使用 `ProFormEditor` 组件

```tsx
import ProFormEditor from '@/components/ProFormEditor';

<ProFormEditor
  name={'content'}
  editorClassName={styles.braftEditor}
  label={'文章内容'}
  extra={'编辑文章时，可以全屏进行编辑哦'}
  placeholder={'请编辑文章内容...'}
  action={`${REACT_APP_API_HOST}/common/aliyunoss`}
  rules={[
    {
      required: true,
      message: `请编辑文章内容`,
      validator: (_, value, callback) => {
        console.log('content:', value.isEmpty());
        if (value.isEmpty()) {
          callback(`请编辑文章内容`);
        } else {
          callback();
        }
      },
    },
  ]}
/>;
```
