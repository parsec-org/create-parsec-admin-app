import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export interface FormValueType extends Partial<API.UserInfo> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.UserInfo>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
  <StepsForm
    stepsProps={{
      size: 'small',
    }}
    stepsFormRender={(dom, submitter) => {
      return (
        <Modal
          width={640}
          styles={{
            body: { padding: '32px 40px 48px' },
          }}
          destroyOnHidden
          title="权限设置"
          open={props.updateModalVisible}
          footer={submitter}
          onCancel={() => props.onCancel()}
        >
          {dom}
        </Modal>
      );
    }}
    onFinish={props.onSubmit}
  >
    <StepsForm.StepForm
      initialValues={{
        name: props.values.name,
        nickName: props.values.nickName,
      }}
      title="基本信息"
    >
      <ProFormText
        width="lg"
        name="name"
        label="规则名称"
        rules={[{ required: true, message: '请输入规则名称！' }]}
      />
      <ProFormTextArea
        name="desc"
        width="lg"
        label="规则描述"
        placeholder="请输入至少五个字符"
        rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
      />
    </StepsForm.StepForm>
    <StepsForm.StepForm
      initialValues={{
        target: '0',
        template: '0',
      }}
      title="配置规则属性"
    >
      <ProFormSelect
        width="lg"
        name="target"
        label="监控对象"
        valueEnum={{
          0: '表一',
          1: '表二',
        }}
      />
      <ProFormSelect
        width="lg"
        name="template"
        label="规则模板"
        valueEnum={{
          0: '规则模板一',
          1: '规则模板二',
        }}
      />
      <ProFormRadio.Group
        name="type"
        width="lg"
        label="规则类型"
        options={[
          {
            value: '0',
            label: '强',
          },
          {
            value: '1',
            label: '弱',
          },
        ]}
      />
    </StepsForm.StepForm>
    <StepsForm.StepForm
      initialValues={{
        type: '1',
        frequency: 'month',
      }}
      title="设定调度周期"
    >
      <ProFormDateTimePicker
        width="lg"
        name="time"
        label="开始时间"
        rules={[{ required: true, message: '请选择开始时间！' }]}
      />
      <ProFormSelect
        width="lg"
        name="frequency"
        label="监控对象"
        valueEnum={{
          month: '月',
          week: '周',
        }}
      />
    </StepsForm.StepForm>
  </StepsForm>
);

export default UpdateForm;
