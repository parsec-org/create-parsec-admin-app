import React, { createContext, use } from 'react';
import { ErrorBoundary, OfflineBanner } from '@/components';

const Context = createContext(null);
const RootProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Context.Provider
      value={null}
    >
      <OfflineBanner />
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Context.Provider>
  );
};
// React 19 起可用 use() 读取 context（不再需要 useContext）
export const useRootProvider = () => use(Context);
export default RootProvider;
