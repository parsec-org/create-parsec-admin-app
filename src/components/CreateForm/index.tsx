import { Modal } from 'antd';
import React, { PropsWithChildren } from 'react';

interface CreateFormProps {
  title?: string;
  modalVisible: boolean;
  onCancel: () => void;
  width?: string | number;
}

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { modalVisible, onCancel, title, width = 680 } = props;

  return (
    <Modal
      destroyOnClose
      title={title || '新建'}
      width={width}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
