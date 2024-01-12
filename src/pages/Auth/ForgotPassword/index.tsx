import {
  CodeOutlined,
  LeftOutlined,
  LockOutlined,
  MobileOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import {
  ProForm,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import type {ProFormInstance} from '@ant-design/pro-components';
import {Button, Image, message, Modal, Result, Space, Spin} from 'antd';
import {useRequest, useTitle} from 'ahooks';
import {Link, history} from '@umijs/max';
import {useCallback, useRef} from 'react';
import {isMobile} from '@/utils';
import {getPublicAuthCode, getSmsAuthCode, postPublicForgetPwd} from '@/services';
import NProgress from 'nprogress';
import './index.less';


export default () => {
  useTitle('云南省核酸检测机构运营平台管理系统-重置密码');
  const formRef = useRef<ProFormInstance>();
  const {loading, data, refresh} = useRequest<API.AuthCodeVo, any>(
    getPublicAuthCode,
    {refreshOnWindowFocus: true, onFinally: () => NProgress.done()},
  );

  const sendSmsAuthCode = useCallback(
    async (phone: string) => {
      const values = formRef.current?.getFieldsValue();
      if (!values['phone']) {
        message.error('请输入手机号码');
        throw new Error('请输入手机号码');
      }
      if (!isMobile(values['phone'])) {
        message.error('请输入正确的手机号码');
        throw new Error('请输入正确的手机号码');
      }
      if (!values['captchaCode']) {
        message.error('请输入图片验证码！');
        throw new Error('请输入图片验证码！');
      }
      try {
        const res = await getSmsAuthCode({
          ...values,
          clientCode: data?.clientCode || '',
        });
        console.log('res', res);
        if (res.code === 0) {
          message.success(`手机号 ${phone} 验证码发送成功!`);
        } else {
          message.error(`验证码发送失败!`);
        }
      } catch (e) {
        throw new Error('验证码发送失败！');
      }
    },
    [data],
  );

  const handleResetPassword = useCallback(async (formData: any) => {
    postPublicForgetPwd({...formData}).then(() => {
      Modal.success({
        icon: null,
        content: (
          <Result
            status="success"
            title="您的登录密码重置成功!"
            subTitle="请牢记您新密码；为了您的数据安全请勿将账号信息告知他人."
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  Modal.destroyAll();
                  history.back();
                }}
              >
                返回登录
              </Button>,
            ]}
          />
        ),
        okButtonProps: {
          style: {display: 'none'},
        },
      });
    });
  }, []);

  return (
    <div className="forgot-password-warp">
      <div className="header">
        <div className="title-warp">
          <div className="logo">&nbsp;</div>
          <div className="title">
            <img
              width={120}
              style={{marginBlockEnd: 12, marginInlineStart: 26}}
              src={require('@/assets/parsec-logo.svg').default}
              alt="logo"
            />
          </div>
        </div>
        <div className="subtitle">秒差距中后台管理系统-重置密码</div>
      </div>
      <ProForm
        className="form-warp"
        formRef={formRef}
        onFinish={handleResetPassword}
        submitter={{
          resetButtonProps: false,
          searchConfig: {
            submitText: '重置密码',
          },
          submitButtonProps: {
            size: 'large',
            block: true,
            loading: loading,
          },
        }}
      >
        <ProFormText
          fieldProps={{
            size: 'large',
            prefix: <MobileOutlined className={'prefixIcon'}/>,
          }}
          name="phone"
          placeholder={'手机号'}
          rules={[
            {
              required: true,
              message: '请输入手机号！',
            },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式错误！',
            },
          ]}
        />
        <ProFormText
          name="captchaCode"
          fieldProps={{
            size: 'large',
            prefix: <CodeOutlined className={'prefixIcon'}/>,
            suffix: (
              <Spin spinning={loading}>
                <Image
                  onClick={() => refresh()}
                  width={100}
                  height={26}
                  preview={false}
                  src={`${APP_API_HOST}${data?.captchaImageUrl}`}
                  style={{cursor: 'pointer'}}
                  fallback="data:image/png;base64,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"
                />
              </Spin>
            ),
          }}
          placeholder={'请输入图片验证码'}
          rules={[
            {
              required: true,
              message: '请输入验证码!',
            },
          ]}
        />
        <ProFormCaptcha
          fieldProps={{
            size: 'large',
            prefix: <SafetyOutlined className={'prefixIcon'}/>,
          }}
          captchaProps={{
            size: 'large',
          }}
          placeholder={'请输入验证码'}
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${'获取验证码'}`;
            }
            return '获取验证码';
          }}
          name="smsCode"
          phoneName="phone"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
          onGetCaptcha={sendSmsAuthCode}
        />
        <ProFormText.Password
          name="newPwd"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'}/>,
          }}
          placeholder={'请输入新密码'}
          rules={[
            {
              required: true,
              message: '请输入新密码！',
            },
          ]}
        />
        <div style={{marginBlockEnd: 24}}>&nbsp;</div>
      </ProForm>
      <Space className="action-warp">
        <Link to={'/auth/login'}>
          <LeftOutlined/>
          &nbsp;返回登录
        </Link>
      </Space>
    </div>
  );
};
