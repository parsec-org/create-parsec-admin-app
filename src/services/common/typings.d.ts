declare namespace API {
  type ComObject = {
    /** 全局错误码， 不建议返回，如需返回，需要提供全局错误码对照表，如果返回，0一定表示成功 */
    code?: number;
    /** 返回数据对象 */
    data?: Record<string, any>;
    /** 必须返回，但不建议前端直接显示 */
    message?: string;
  };

  type AuthLoginVo = {
    /** 用户输入的验证码 */
    captchaCode: string;
    /** 验证码的索引代码 */
    clientCode: string;
    /** 密码 */
    password: string;
    /** 用户名 */
    username: string;
  };

  type AuthCodeVo = {
    clientCode: string;
    captchaImageUrl: string;
  };

  type AuthRuleListItem = {
    /** 权限路由 */
    route: string;
    /** 权限类型 */
    type: string;
  };

  type AdminUserVo = {
    /** 管理员ID */
    id: number;
    /** 权限ID */
    authId: number;
    /** 管理员名称 */
    adminName: string;
    /** 真实姓名 */
    realName: string;
    loginName: string;
    /** 角色名称 */
    roleName: string;
    /** 手机号码 */
    phone: string;
    /** 角色ID */
    roleId: any;
    /** 创建人 */
    creator: string;
    /** 创建时间 */
    createdAt: string;
    /** 修改人 */
    updater: string;
    /** 修改时间 */
    updateAt: string;
    /** 状态 */
    state?: boolean;
  };

  type getAuthMeParams = {
    /** authentId */
    authentId?: string;
  };

  type ManageRoleListItem = {
    id: number;
    name: string;
    updater: string;
    updatedAt: string;
    createdAt: string;
  };

  type ManagerAdminUser = {
    /** 管理员ID */
    id: number;
    /** 用户名 */
    adminName: string;
    /** 密码 */
    password: string;
    /** 真实姓名 */
    realName: string;
    /** 手机号 */
    phone: string;
    /** 状态 */
    state: boolean | string;
    /** 角色ID */
    roleId: number;
  };
}
