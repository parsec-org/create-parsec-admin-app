import React from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import LinkButton from '../LinkButton';
import { DownOutlined } from '@ant-design/icons';

export default (props: DropDownProps) => (
  <Dropdown {...props}>
    <LinkButton
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      更多 <DownOutlined />
    </LinkButton>
  </Dropdown>
);
