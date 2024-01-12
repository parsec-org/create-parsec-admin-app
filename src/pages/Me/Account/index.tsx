import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormCascader,
  ProFormDependency,
  ProFormDigit,
  ProFormSegmented,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import React, { useCallback } from 'react';
import CascaderOptions from '@pansy/china-division';
import { useRequest, useToggle } from 'ahooks';
import { Button, Form, message } from 'antd';
import { useModel } from '@umijs/max';
import { getAuthMe, getManageRoleList, modifyAdminUserInfo } from '@/services';

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm<API.AdminUserVo>();
  const { data: roleList } = useRequest(getManageRoleList, {
    cacheKey: 'role-options-data',
  });
  const [editable, { toggle: setEditable }] = useToggle<boolean>(true);

  /**
   * 同步更新数据
   */
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  /**
   * 修改账号信息
   * @param fields
   */
  const handleSaveAdminInfo = async (fields: API.AdminUserVo) => {
    const hide = message.loading('保存中...', 0);
    try {
      await modifyAdminUserInfo({ ...fields } as any);
      hide();
      message.success('保存成功', 2, fetchUserInfo);
      setEditable();
      return true;
    } catch (error) {
      hide();
      message.error('保存失败请重试！');
      return false;
    }
  };
  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard
          title="基本信息"
          colSpan="60%"
          extra={
            <Button
              type={'primary'}
              ghost
              onClick={setEditable}
              size={'middle'}
            >
              {editable ? '修改信息' : '取消修改'}
            </Button>
          }
        >
          <ProForm<API.AdminUserVo>
            size={'large'}
            form={form}
            disabled={editable}
            onFinish={async (values) => handleSaveAdminInfo(values)}
            submitter={{
              searchConfig: {
                submitText: '保存修改',
              },
              submitButtonProps: {},
              // render: (props, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            }}
            request={useCallback(async () => {
              const { data } = await getAuthMe({});
              return {
                ...data,
                state: `${data?.state || false}`,
              } as any;
            }, [initialState?.currentUser])}
          >
            <div style={{ display: 'none' }}>
              <ProFormText name="id" />
            </div>
            <ProFormText
              name="adminName"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
              placeholder="请输入用户名"
            />
            <ProFormText
              name="realName"
              label="真实姓名"
              rules={[{ required: true, message: '请输入真实姓名' }]}
              placeholder="请输入真实姓名"
            />
            <ProFormDigit
              name="phone"
              label="手机号码"
              tooltip={'手机号码是用于登录系统的账号信息，不能重复出现。'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号码',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '请输入正确的手机号码',
                },
              ]}
              placeholder="请输入手机号码"
            />
            <ProFormSegmented
              name="state"
              label="状态"
              disabled
              valueEnum={{
                true: '开通',
                false: '禁用',
              }}
              rules={[{ required: true, message: '请选择账号状态!' }]}
            />
            <ProFormSelect
              options={roleList?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              name="roleId"
              label="所属角色"
              disabled
            />
            <ProFormDependency name={['roleId']}>
              {({ roleId }) => {
                if (roleId) {
                  const ruleName =
                    (roleList || []).filter((x) => x.id === roleId)[0]?.name ||
                    '';
                  if (ruleName === '教育局') {
                    return (
                      <ProFormCascader
                        width="md"
                        name="province"
                        disabled
                        label="所属地区"
                        fieldProps={{
                          options: CascaderOptions,
                          changeOnSelect: true,
                        }}
                      />
                    );
                  }
                }
                return null;
              }}
            </ProFormDependency>
          </ProForm>
        </ProCard>
        <ProCard headerBordered></ProCard>
      </ProCard>
    </PageContainer>
  );
};
