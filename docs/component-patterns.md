# 组件编写规范与模式

## 概述

本项目使用 React + TypeScript + Ant Design Pro Components。组件统一管理在 `src/components/` 目录。

## 目录结构

```
src/components/
├── index.ts                    # 组件导出入口（必须！所有公共组件在此导出）
├── ActionsWrap/               # 操作按钮组（超过3个自动折叠到"更多"菜单）
├── CreateForm/                # 新建表单 Modal 封装
├── ExportExcelButton/          # Excel 导出按钮
├── Guide/                     # 首页引导组件
├── Layout/                    # 布局组件（含 AvatarDropdown 逻辑）
├── LinkButton/                # 链接按钮（表格操作列常用）
├── ProFormCropUpload/         # 图片裁剪上传组件
├── ProFormEditor/             # 富文本编辑器（含 Editor 核心）
└── RightContent/              # 右侧内容区（语言切换、帮助、头像下拉）
```

## 组件导出规范

**重要**：所有公共组件必须在 `src/components/index.ts` 中导出：

```typescript
// src/components/index.ts
export { default as ActionsWrap } from './ActionsWrap';
export { default as CreateForm } from './CreateForm';
export { default as ExportExcelButton } from './ExportExcelButton';
export { default as Guide } from './Guide';
export { default as LinkButton } from './LinkButton';
export { default as ProFormCropUpload } from './ProFormCropUpload';
export { default as ProFormEditor } from './ProFormEditor';
export type { ExcelColumns, ExportExcelButtonProps } from './ExportExcelButton';
```

## 页面组件模式

### 标准列表页结构

```
src/pages/Module/
├── index.tsx          # 列表页主组件（ProTable + PageContainer）
├── index.less          # 页面样式（CSS Modules，可选）
└── components/
    ├── CreateForm.tsx   # 新建表单弹窗
    └── UpdateForm.tsx   # 编辑表单弹窗
```

### 列表页主组件模板

```tsx
import { PlusOutlined } from '@ant-design/icons';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { getUserList } from '@/services/common';
import { LinkButton } from '@/components';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

const ModulePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.User>();

  const columns: ProColumns<API.User>[] = [
    { title: '名称', dataIndex: 'name' },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <LinkButton key="edit" onClick={() => {
          setCurrentRow(record);
          setUpdateModalVisible(true);
        }}>
          编辑
        </LinkButton>,
        <LinkButton key="delete" danger onClick={() => handleDelete(record)}>
          删除
        </LinkButton>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        toolBarRender={() => [
          <Button type="primary" key="create" onClick={() => setCreateModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params) => {
          const { data } = await getUserList(params);
          return { data: data?.list, success: true, total: data?.total };
        }}
      />
      <CreateForm
        modalVisible={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
      />
      <UpdateForm
        modalVisible={updateModalVisible}
        values={currentRow}
        onCancel={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default ModulePage;
```

### CreateForm 模板（使用公共 CreateForm 组件封装）

```tsx
import { CreateForm } from '@/components';
import { Form, ProFormText } from '@ant-design/pro-components';
import React from 'react';
import { createUser } from '@/services/common';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateFormComponent: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  const handleAdd = async (values: Record<string, any>) => {
    const success = await createUser(values as API.CreateUserDto);
    if (success) {
      onCancel();
    }
    return success;
  };

  return (
    <CreateForm modalVisible={modalVisible} onCancel={onCancel}>
      <Form onFinish={handleAdd}>
        <ProFormText
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        />
      </Form>
    </CreateForm>
  );
};

export default CreateFormComponent;
```

### UpdateForm 模板（使用 antd Modal）

```tsx
import { Modal } from 'antd';
import { Form, ProFormText } from '@ant-design/pro-components';
import React from 'react';
import { updateUser } from '@/services/common';

interface UpdateFormProps {
  modalVisible: boolean;
  values?: API.User;
  onCancel: () => void;
}

const UpdateFormComponent: React.FC<UpdateFormProps> = (props) => {
  const { modalVisible, values, onCancel } = props;

  const handleUpdate = async (values: Record<string, any>) => {
    const success = await updateUser({ id: values.id, ...values });
    if (success) {
      onCancel();
    }
    return success;
  };

  return (
    <Modal
      destroyOnHidden
      title="编辑"
      open={modalVisible}
      onCancel={onCancel}
      footer={null}
    >
      <Form initialValues={values} onFinish={handleUpdate}>
        <ProFormText name="id" hidden />
        <ProFormText
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        />
      </Form>
    </Modal>
  );
};

export default UpdateFormComponent;
```

## 常用组件使用

### LinkButton（链接按钮）

表格操作列的标准按钮组件：

```tsx
import { LinkButton } from '@/components';

{
  title: '操作',
  valueType: 'option',
  render: (_, record) => [
    <LinkButton key="edit" onClick={() => handleEdit(record)}>编辑</LinkButton>,
    <LinkButton key="delete" danger onClick={() => handleDelete(record)}>删除</LinkButton>,
  ],
}
```

### ActionsWrap（操作按钮组）

```tsx
import { ActionsWrap, LinkButton } from '@/components';

<ActionsWrap>
  <LinkButton onClick={() => handleEdit()}>编辑</LinkButton>
  <LinkButton onClick={() => handleDelete()}>删除</LinkButton>
  <LinkButton onClick={() => handleView()}>查看</LinkButton>
  <LinkButton onClick={() => handleCopy()}>复制</LinkButton>
</ActionsWrap>
// 超过3个按钮自动折叠到"更多"菜单
```

### ExportExcelButton（导出按钮）

```tsx
import { ExportExcelButton } from '@/components';

<ExportExcelButton
  columns={columns}
  dataSource={dataSource}
  filename="用户列表"
  buttonText="导出 Excel"
/>
```

### CreateForm（新建表单 Modal）

```tsx
import { CreateForm } from '@/components';

<CreateForm
  modalVisible={createModalVisible}
  onCancel={() => setCreateModalVisible(false)}
  title="新建用户"
  width={680}
>
  {children}
</CreateForm>
```

## 样式规范

### Less / CSS Modules

页面级样式使用 CSS Modules（`.less` 文件）：

```less
// src/pages/Module/index.less
.container {
  padding: 24px;
  background: var(--parsec-color-bg-container);
}
```

```tsx
import styles from './index.less';
<div className={styles.container}>...</div>
```

### Antd Token

使用 Ant Design v5 的 Design Token：

```tsx
import { useToken } from 'antd';

const { token } = useToken();
<div style={{ color: token.colorPrimary }}>...</div>
```

### antd-style (css-in-js)

全局样式可通过 `src/global.style.ts` 使用 `createStyles`：

```tsx
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  wrapper: css`
    color: ${token.colorPrimary};
    padding: 24px;
  `,
}));
```

### 重要提醒

- **Antd 类名前缀为 `parsec`**（非 `ant`），全局样式覆盖时使用 `.parsec-btn`、`.parsec-table` 等
- 主题色通过 token 获取，不要硬编码颜色值

## TypeScript 类型规范

```typescript
// 简单 Props
interface ButtonProps {
  type: 'primary' | 'default';
  onClick: () => void;
}

// 泛型 Props
interface TableProps<T> {
  dataSource: T[];
  onSelect: (row: T) => void;
}

// 使用 PropsWithChildren
import type { PropsWithChildren } from 'react';
const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = (props) => {
  return <div>{props.children}</div>;
};
```

## 使用全局功能

### 全局 modal / message

```tsx
import { useRootProvider } from '@/libs/context';

const { modal, message } = useRootProvider();

modal.confirm({ title: '确认操作？' });
message.success('操作成功');
message.error('操作失败');
```

### 全局状态 model

```tsx
import { useModel } from '@umijs/max';

// 使用已有的 global model
const { name, setName } = useModel('global');

// 添加新 model 后自动可用
const { count, setCount } = useModel('counter');
```

## 相关文件

- [src/components/index.ts](../src/components/index.ts) — 组件导出入口
- [src/libs/context/index.ts](../src/libs/context/index.ts) — 全局 Context
- [src/global.less](../src/global.less) — 全局样式
- [src/global.style.ts](../src/global.style.ts) — 全局 css-in-js 样式
