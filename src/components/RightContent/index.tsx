import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import React from 'react';

export type SiderTheme = 'light' | 'dark';

export const SelectLang: React.FC<{
  className?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ className, icon, style }) => {
  return (
    <UmiSelectLang
      className={className}
      icon={icon}
      style={{
        padding: 4,
        ...style,
      }}
    />
  );
};

export const Question: React.FC = () => {
  return (
    <a
      href="https://www.parsec.com.cn"
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'inline-flex',
        padding: '4px',
        fontSize: '18px',
        color: 'inherit',
      }}
    >
      <QuestionCircleOutlined />
    </a>
  );
};
