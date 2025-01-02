const users = [
  {
    id: 0,
    name: '秒差距',
    nickName: 'super admin',
    gender: 'MALE',
    phone: '15999999999',
    roleId: 1,
    roleName: '超级管理员',
  },
  {
    id: 1,
    name: '苗木安利',
    nickName: 'admin',
    gender: 'FEMALE',
    phone: '15888888888',
    roleId: 2,
    roleName: '管理员',
  },
];

export default {
  'GET /auth/me': (req: any, res: any) => {
    res.json({
      success: true,
      data: users[Math.random() > 0.5 ? 1 : 0],
      errorCode: 0,
    });
  },
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'GET /manage/role/list': (req: any, res: any) => {
    res.json([
      {
        id: 1,
        name: '超级管理员',
        updater: '超级管理员',
        updatedAt: '2024-12-01 12:00:00',
        createdAt: '2024-12-01 12:00:00',
      },
      {
        id: 2,
        name: '管理员',
        updater: '超级管理员',
        updatedAt: '2024-12-01 12:00:00',
        createdAt: '2024-12-01 12:00:00',
      },
      {
        id: 3,
        name: '普通员工',
        updater: '超级管理员',
        updatedAt: '2024-12-01 12:00:00',
        createdAt: '2024-12-01 12:00:00',
      },
    ]);
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
