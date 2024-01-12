import { request } from '@umijs/max';

/** 当前登录用户的详细信息 需要自行扩展 GET /auth/me */
export async function getAuthMe(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuthMeParams,
  options?: { [key: string]: any },
) {
  return request<{ code?: number; data?: API.AdminUserVo; message?: string }>(
    '/auth/me',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改当前用户自身的密码 PUT /auth/password */
export async function modifyCurrentLoginPwd(
  body: {
    /** 原密码 */
    oldPwd: string;
    /** 新密码 */
    newPwd: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ComObject>('/auth/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 当前登录管理员权限路由列表 如果是系统内置超级管理员admin,则返回空数组,不受系统角色管理控制 GET /auth/rules */
export async function getAuthRules(options?: { [key: string]: any }) {
  return request<API.AuthRuleListItem[]>('/auth/rules', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取验证码(已完成) GET /public/authCode */
export async function getPublicAuthCode(options?: { [key: string]: any }) {
  return request<API.AuthCodeVo>('/public/authCode', {
    method: 'GET',
    ...(options || {}),
  });
}



/** 忘记密码 POST /public/forget/pwd */
export async function postPublicForgetPwd(
  body: {
    phone: string;
    smsCode: string;
    /** MD5(新密码) */
    newPwd: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ComObject>('/public/forget/pwd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 图片验证码登录 captcha验证 POST /public/login */
export async function authLogin(
  body: API.AuthLoginVo,
  options?: { [key: string]: any },
) {
  return request<{ code?: number; data?: string; message?: string }>(
    '/public/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 获取短信验证码 阿里云短信服务 POST /public/sms/auth/code */
export async function getSmsAuthCode (
  body: {
    /** 手机号 */
    phone: string;
    /** 验证码的索引代码 */
    clientCode?: string;
    /** 用户输入的验证码 */
    captchaCode?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ComObject>(
    '/public/sms/auth/code',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}


/** 角色列表 GET /manage/role/list */
export async function getManageRoleList(options?: { [key: string]: any }) {
  return request<API.ManageRoleListItem[]>('/manage/role/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 管理员新增/修改 POST /manage/admin/save */
export async function modifyAdminUserInfo(
  body: API.ManagerAdminUser,
  options?: { [key: string]: any },
) {
  return request<API.ComObject>('/manage/admin/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}