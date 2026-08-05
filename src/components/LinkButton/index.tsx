import React from 'react';
import { theme } from 'antd';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  danger?: boolean;
}

export default ({ danger, children, style, ...rest }: Props) => {
  const { token } = theme.useToken();
  return (
    <a
      onClick={e => e.preventDefault()}
      className="parsec-dropdown-link"
      style={{ color: danger ? token.colorError : undefined, ...style }}
      {...rest}
    >
      {children}
    </a>
  );
};
