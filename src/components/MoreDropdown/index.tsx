import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import LinkButton from '../LinkButton';

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
