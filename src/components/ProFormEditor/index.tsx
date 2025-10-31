import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import type { IEditorProps } from './Editor';
import WangEditor from './Editor';

const ProFormEditor = (props: IEditorProps & Omit<ProFormItemProps, 'placeholder'>) => {
  return (
    <ProForm.Item {...props}>
      <WangEditor placeholder={props.placeholder} action={props.action} {...props} />
    </ProForm.Item>
  );
};
export default ProFormEditor;
