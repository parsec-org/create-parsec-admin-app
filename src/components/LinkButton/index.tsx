import React from 'react';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  danger?: boolean;
}

export default ({ danger, children, style, ...rest }: Props) => (
  <a
    onClick={e => e.preventDefault()}
    className="parsec-dropdown-link"
    style={{ color: danger ? 'red' : undefined, ...style }}
    {...rest}
  >
    {children}
  </a>
);
