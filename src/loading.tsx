import ProSkeleton from '@ant-design/pro-skeleton';
import React from 'react';

const Loading: React.FC = () => (
  <div
    style={{
      background: '#fafafa',
      padding: 24,
    }}
  >
    <ProSkeleton type="list" />
  </div>
);

export default Loading;
