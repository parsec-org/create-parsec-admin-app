# API 规范约定

## 概述

本项目使用 UmiJS `@umijs/max` 内置的 request 插件（基于 axios），API 服务位于 `src/services/` 目录。支持通过 OpenAPI 自动生成服务代码。

## 目录结构

```
src/services/
├── index.ts           # 服务导出入口
└── common/           # OpenAPI 生成的 API 服务
    ├── index.ts
    └── typings.d.ts
```

## 请求配置（src/requestConfig.ts）

### 环境变量

- **`APP_API_HOST`**：API 前缀地址，由各环境配置文件注入。非 `http` 开头的 URL 会自动拼接此前缀

### 请求拦截器

```
requestInterceptors → 拼接 APP_API_HOST + Authorization token
  → 发送请求
    → responseInterceptors → 提取响应头 token 并存储
      → errorThrower → 业务错误抛出 BizError
        → errorHandler → 统一错误处理
```

### 自动处理

- [x] 自动拼接 `APP_API_HOST` 前缀（非 http 开头时）
- [x] 注入 `Authorization: Bearer <token>` 请求头
- [x] 自动提取响应头中的 token 并存储
- [x] 超时设置（15 秒）
- [x] 403 状态码：弹出 Modal，确认后清除缓存并跳转登录页（保留 redirect）
- [x] 其他 4xx/5xx：显示错误消息
- [x] 请求异常：提示"服务器暂时没有回应"
- [x] 发送前异常：提示"请求错误，请重新尝试"

### Token 管理

```typescript
// Token 存储在 localStorage 中的 key：parsec-admin-token
// 通过 src/constants/index.ts 中的 TOKEN 常量引用
// 操作通过 src/utils/storage.ts 封装

import storage from '@/utils/storage';
import { TOKEN } from '@/constants';

storage.get(TOKEN);   // 获取 token
storage.set(TOKEN, value);  // 设置 token
storage.clear();      // 清除所有缓存

// Authorization 格式
// Authorization: Bearer <token>
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
  SILENT = 0,           // 静默处理，不提示
  WARN_MESSAGE = 1,     // 警告消息
  ERROR_MESSAGE = 2,    // 错误消息
  NOTIFICATION = 3,     // 通知提示
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

## 使用示例

### 生成 API 服务

```bash
# 运行 OpenAPI 代码生成
pnpm run openapi
```

生成的代码位于 `src/services/common/` 目录。

### 在页面中调用 API

```typescript
// Hook 方式（推荐，集成 loading/error 状态）
import { useRequest } from 'ahooks';
import { getUserList } from '@/services/common';

const { data, loading, run } = useRequest(
  () => getUserList({ page: 1, pageSize: 10 }),
  { refreshDeps: [] }
);

// 在 ProTable 中使用
<ProTable
  request={async (params) => {
    const { data } = await getUserList(params);
    return { data: data?.list, success: true, total: data?.total };
  }}
/>
```

### 请求参数说明

```typescript
// Query 参数（GET）
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

// Body 参数（POST）
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

// 跳过错误处理
const result = await getUserList(params, { skipErrorHandler: true });
```

## 相关文件

- [src/requestConfig.ts](../src/requestConfig.ts) — 请求拦截配置
- [src/constants/index.ts](../src/constants/index.ts) — TOKEN 常量
- [src/utils/storage.ts](../src/utils/storage.ts) — 本地存储封装
- [src/services/common/index.ts](../src/services/common/index.ts) — API 服务
