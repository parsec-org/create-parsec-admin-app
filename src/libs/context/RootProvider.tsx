import React, { createContext, useContext } from 'react';
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
export const useRootProvider = () => useContext(Context);
export default RootProvider;
