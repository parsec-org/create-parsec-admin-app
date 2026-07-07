# 组件编写规范与模式

## 概述

本项目使用 React + TypeScript + Ant Design Pro Components。组件统一管理在 `src/components/` 目录。

## 目录结构

```
src/components/
├── index.ts                    # 组件导出入口（重要！）
├── ActionsWrap/               # 操作按钮组件
├── CreateForm/                # 新建表单 Modal
├── ExportExcelButton/          # Excel 导出按钮
├── Layout/                    # 布局组件
├── LinkButton/                # 链接按钮
├── MoreDropdown/              # 更多下拉菜单
├── ProFormCropUpload/         # 图片裁剪上传
├── ProFormEditor/             # 富文本编辑器
└── RightContent/              # 右侧内容区
```

## 组件导出规范

**重要**：所有公共组件必须在 `src/components/index.ts` 中导出：

```typescript
// src/components/index.ts
export { default as ActionsWrap } from './ActionsWrap';
export { default as CreateForm } from './CreateForm';
export type { ExcelColumns, ExportExcelButtonProps } from './ExportExcelButton';
```

## 页面组件模式

### 标准列表页结构

```
src/pages/Users/
├── index.tsx          # 列表页主组件
└── components/
    ├── CreateForm.tsx   # 新建表单
    └── UpdateForm.tsx   # 编辑表单
```

### 列表页主组件模板

```typescript
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { getUserList } from '@/services/common';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

const Users: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.User>();

  const columns: ProColumns<API.User>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <LinkButton
          key="edit"
          onClick={() => {
            setCurrentRow(record);
            setUpdateModalVisible(true);
          }}
        >
          编辑
        </LinkButton>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="create"
            onClick={() => setCreateModalVisible(true)}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params) => {
          const { data } = await getUserList(params);
          return { data: data?.list, success: true, total: data?.total };
        }}
        columns={columns}
      />

      <CreateForm
        modalVisible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
      />

      <UpdateForm
        modalVisible={updateModalVisible}
        values={currentRow}
        onCancel={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
      />
    </PageContainer>
  );
};

export default Users;
```

### CreateForm 模板

```typescript
// src/pages/Users/components/CreateForm.tsx
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
    <CreateForm
      modalVisible={modalVisible}
      onCancel={onCancel}
    >
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

### UpdateForm 模板

```typescript
// src/pages/Users/components/UpdateForm.tsx
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
      <Form
        initialValues={values}
        onFinish={handleUpdate}
      >
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

```typescript
import { LinkButton } from '@/components';

// 在表格操作列中使用
{
  title: '操作',
  valueType: 'option',
  render: (_, record) => [
    <LinkButton key="edit" onClick={() => handleEdit(record)}>
      编辑
    </LinkButton>,
    <LinkButton key="delete" onClick={() => handleDelete(record)}>
      删除
    </LinkButton>,
  ],
}
```

### ActionsWrap（操作按钮组）

```typescript
import { ActionsWrap } from '@/components';

<ActionsWrap>
  <LinkButton onClick={() => handleEdit()}>编辑</LinkButton>
  <LinkButton onClick={() => handleDelete()}>删除</LinkButton>
  <LinkButton onClick={() => handleView()}>查看</LinkButton>
</ActionsWrap>
// 超过3个会自动折叠到"更多"菜单
```

### ExportExcelButton（导出按钮）

```typescript
import { ExportExcelButton } from '@/components';

<ExportExcelButton
  columns={columns}
  dataSource={dataSource}
  filename="用户列表"
  buttonText="导出 Excel"
/>
```

### CreateForm（新建表单 Modal）

```typescript
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

## TypeScript 类型规范

### Props 类型定义

```typescript
// 简单类型
interface ButtonProps {
  type: 'primary' | 'default';
  onClick: () => void;
}

// 复杂类型使用泛型
interface TableProps<T> {
  dataSource: T[];
  onSelect: (row: T) => void;
}

// 使用 React.FC 或直接使用函数组件
const MyComponent: React.FC<Props> = (props) => { ... }

// 或使用箭头函数（推荐）
const MyComponent = (props: Props) => { ... }
```

### 组件 children 类型

```typescript
import type { PropsWithChildren } from 'react';

// 用于包装组件
const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = (props) => {
  return <div>{props.children}</div>;
};
```

## 样式规范

### Less 变量

项目使用 Ant Design 的 Less 变量系统，详见 `src/global.less`。

### 组件样式

```typescript
// 方式1: 使用 CSS Modules
import styles from './index.less';

// 方式2: 使用 Ant Design token
import { useToken } from 'antd';

const MyComponent = () => {
  const { token } = useToken();
  return <div style={{ color: token.colorPrimary }}>...</div>;
};
```

## 相关文件

- [CONTRIBUTING.md](../CONTRIBUTING.md) - 开发规范
- [src/components/index.ts](../src/components/index.ts) - 组件导出
- [src/pages/Users/index.tsx](../src/pages/Users/index.tsx) - 列表演示
