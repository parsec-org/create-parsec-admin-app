# API 规范约定

## 概述

本项目使用 OpenAPI 规范生成 API 服务代码，所有 API 服务位于 `src/services/` 目录。

## 目录结构

```
src/services/
├── index.ts           # 服务导出入口
├── common/           # 通用 API 服务（通过 openapi 生成）
│   ├── index.ts
│   └── typings.d.ts
└── demo/             # 示例 API 服务
    ├── index.ts
    └── typings.d.ts
```

## 响应格式

### 成功响应

```typescript
{
  success: boolean;      // 请求是否成功
  data: any;             // 响应数据
  errorCode?: number;    // 错误码
  errorMessage?: string; // 错误信息
  showType?: number;     // 错误展示类型
}
```

### 错误类型 (ErrorShowType)

```typescript
enum ErrorShowType {
  SILENT = 0,           // 静默处理
  WARN_MESSAGE = 1,     // 警告消息
  ERROR_MESSAGE = 2,    // 错误消息
  NOTIFICATION = 3,      // 通知提示
  REDIRECT = 404,       // 页面跳转
}
```

## HTTP 方法约定

| 方法 | 用途 | 示例 |
|------|------|------|
| GET | 查询数据 | `getUserList`, `getUserById` |
| POST | 新增数据 | `createUser`, `login` |
| PUT | 更新数据 | `updateUser`, `modifyPassword` |
| DELETE | 删除数据 | `deleteUser` |

## API 命名规范

### 文件命名
- 使用 PascalCase
- 与业务模块对应，如 `users.ts`, `orders.ts`

### 函数命名
```typescript
// 获取列表
export async function getXxxList() {}

// 获取单个
export async function getXxxById() {}

// 创建
export async function createXxx() {}

// 更新
export async function updateXxx() {}

// 删除
export async function deleteXxx() {}
```

## 请求拦截器

位于 `src/requestConfig.ts`，已配置：

### 自动处理
- [x] 添加 `Authorization` 头（从 storage 获取 token）
- [x] 自动拼接 `APP_API_HOST` 前缀（非 http 开头时）
- [x] 超时设置（15秒）

### Token 格式
```typescript
Authorization: Bearer <token>
```

## 错误处理

### HTTP 状态码处理

| 状态码 | 处理方式 |
|--------|----------|
| 403 | 弹出 Modal 提示登录过期，跳转登录页 |
| 其他 4xx/5xx | 显示错误消息 |

### 业务错误处理

```typescript
import { useRequest } from 'ahooks';
import { getUserList } from '@/services/common';

const { data, loading, error, run } = useRequest(() => getUserList(params));

if (error) {
  // 错误已由 errorHandler 统一处理
}
```

## 使用示例

### 生成新的 API 服务

1. 编写 OpenAPI 文档或 Swagger 定义
2. 运行 `yarn openapi`
3. 生成的代码位于 `src/services/`

### 调用 API

```typescript
import { getUserList } from '@/services/common';
import { useRequest } from 'ahooks';

// Hook 方式（推荐）
const { data, loading, run } = useRequest(
  () => getUserList({ page: 1, pageSize: 10 }),
  {
    defaultParams: [{ page: 1, pageSize: 10 }],
    refreshDeps: [],
  }
);

// 手动调用
const result = await getUserList({ page: 1, pageSize: 10 });
```

### 带参数的请求

```typescript
// Query 参数
export async function getUserById(
  params: { id: string },
  options?: { [key: string]: any }
) {
  return request('/users', {
    method: 'GET',
    params,  // 自动拼接为 ?id=xxx
    ...(options || {}),
  });
}

// Body 参数
export async function createUser(
  body: { name: string; email: string },
  options?: { [key: string]: any }
) {
  return request('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  });
}
```

## 相关文件

- [CONTRIBUTING.md](../CONTRIBUTING.md) - 开发规范
- [src/requestConfig.ts](../src/requestConfig.ts) - 请求配置
- [src/services/common/index.ts](../src/services/common/index.ts) - API 服务示例
