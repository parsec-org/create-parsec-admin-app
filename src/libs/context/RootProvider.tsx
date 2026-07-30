import type { MessageInstance } from 'antd/es/message/interface';
import type { HookAPI } from 'antd/es/modal/useModal';
import { message, Modal } from 'antd';
import React, { createContext, useContext } from 'react';

interface ProviderType {
  modal: HookAPI;
  message: MessageInstance;
}
const Context = createContext<ProviderType>({
  modal: {} as HookAPI,
  message: {} as MessageInstance,
});
const RootProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [modal, modalContextHolder] = Modal.useModal();
  const [api, messageContextHolder] = message.useMessage();
  // const location = useLocation()
  // const { canAccessRoute } = useAccess()

  // useDebounceEffect(
  //   () => {
  //     const match = matchRoutes(
  //       [
  //         { path: '/auth/login' },
  //         { path: '/403' },
  //         { path: '/404' },
  //         { path: '/500' },
  //       ],
  //       location.pathname,
  //     )
  //     if (isEmpty(match) && !canAccessRoute) {
  //       modal.confirm({
  //         title: '温馨提示',
  //         centered: true,
  //         content: (
  //           <div>
  //             <p>
  //               您的企业信息尚未登记完善,需要先完善企业信息后才能正常使用本系统，如有疑问请联系管理员。
  //             </p>
  //           </div>
  //         ),
  //         onCancel() {
  //           storage.del(TOKEN)
  //           storage.del(TENANT_ID)
  //           const urlParams = new URL(window.location.href).searchParams
  //           /** 此方法会跳转到 redirect 参数所在的位置 */
  //           const redirect = urlParams.get('redirect')
  //           // Note: There may be security issues, please note
  //           if (window.location.pathname !== LOGIN_PATH && !redirect) {
  //             toLogin()
  //           }
  //         },
  //         onOk: () => {
  //           history.replace('/registration/info')
  //         },
  //       })
  //     }
  //   },
  //   [location.pathname, canAccessRoute, modal],
  //   {
  //     wait: 500,
  //   },
  // )
  return (
    <Context.Provider
      value={{
        modal,
        message: api,
      }}
    >
      {children}
      {modalContextHolder}
      {messageContextHolder}
    </Context.Provider>
  );
};
export const useRootProvider = () => useContext(Context);
export default RootProvider;
