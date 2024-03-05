import { modifyCurrentLoginPwd } from '@/services';
import {
  PageContainer,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';

export default () => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 },
  };

  return (
    <PageContainer>
      <div style={{ width: '480px', margin: '0 auto' }}>
        <ProForm<{
          oldPwd: string;
          confirm?: string;
          newPwd: string;
        }>
          {...formItemLayout}
          layout={'vertical'}
          size={'large'}
          submitter={{
            searchConfig: {
              submitText: '确认修改',
            },
          }}
          onFinish={async (values) => {
            const hide = message.loading('密码修改中...', 0);
            try {
              await modifyCurrentLoginPwd({ ...values });
              hide();
              message.success('密码修改成功');
            } catch (e) {
              hide();
            }
          }}
        >
          <ProFormText.Password
            name="oldPwd"
            label="原密码"
            tooltip="登录系统时，输入的密码"
            placeholder="请输入原密码"
            rules={[
              {
                required: true,
                message: '请输入原密码!',
              },
            ]}
          />
          <ProFormText.Password
            name="newPwd"
            label="新密码"
            placeholder="请输入新密码"
            rules={[
              {
                required: true,
                message: '请输入新密码!',
              },
            ]}
          />
          <ProFormText.Password
            name="confirm"
            dependencies={['newPwd']}
            label="确认新密码"
            placeholder="请输入确认新密码"
            rules={[
              {
                required: true,
                message: '请输入确认新密码!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPwd') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('您输入的两次新密码不匹配!'));
                },
              }),
            ]}
          />
        </ProForm>
      </div>
    </PageContainer>
  );
};
