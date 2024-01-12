import React from 'react';
import { useModel } from '@umijs/max';
import { Space } from 'antd';
import Avatar from './AvatarDropdown';
import type {HeaderProps} from "@ant-design/pro-components";
import styles from './index.less';

const GlobalHeaderRight: React.FC<{showAvatarDropdown?: boolean; headerProps: HeaderProps}> = ({ showAvatarDropdown, headerProps }) => {

  const { initialState } = useModel('@@initialState');
  const { isMobile = false } = headerProps;
  console.log('isMobile', isMobile);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <Avatar menu={showAvatarDropdown} />
    </Space>
  );
};
export default GlobalHeaderRight;
