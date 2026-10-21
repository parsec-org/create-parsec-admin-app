import type { FC } from 'react';
import { Image } from 'antd';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

interface PreviewImageProps {
  url: string;
  onClose: () => void;
}

/**
 * 预览载体组件：自身不展示缩略图，只负责撑起 antd Image 的预览层
 * antd v6 的预览层通过 Portal 渲染到 body，因此这里隐藏原图不影响预览
 */
const PreviewImage: FC<PreviewImageProps> = ({ url, onClose }) => {
  const [open, setOpen] = useState(true);

  return (
    <Image
      src={url}
      style={{ display: 'none' }}
      preview={{
        open,
        onOpenChange: (nextOpen: boolean) => {
          setOpen(nextOpen);
          if (!nextOpen) {
            onClose();
          }
        },
      }}
    />
  );
};

/**
 * 以编程方式打开图片预览
 *
 * 替换了已废弃的 `rc-image/lib/Preview` 深层引入与 `ReactDOM.render` / `unmountComponentAtNode`：
 * - 深层引入 rc-image 内部模块在 antd v6 中已不可用
 * - `ReactDOM.render` / `unmountComponentAtNode` 在 React 19 中已移除，统一改用 `createRoot`
 *
 * 入参 `url` 为图片地址；返回 `destroy` 用于手动关闭预览。
 */
export default ({ url }: { url: string }) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  const destroy = () => {
    // 防止重复卸载同一 root（会触发 React 告警）
    if (!container.isConnected) {
      return;
    }
    container.remove();
    // 延后卸载：避免在 React 事件回调 / 渲染期间同步卸载 root 触发告警
    setTimeout(() => {
      root.unmount();
    }, 0);
  };

  root.render(<PreviewImage url={url} onClose={destroy} />);

  return { destroy };
};
