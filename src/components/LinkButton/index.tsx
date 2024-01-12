import React from 'react';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
}

export default (props: Props) => (
  <a
    onClick={(e) => e.preventDefault()}
    className={'ant-dropdown-link'}
    {...props}
  >
    {props.children}
  </a>
);
