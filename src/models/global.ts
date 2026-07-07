// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';

function useUser() {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  return {
    name,
    setName,
  };
}

export default useUser;
