import {
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import Preview from 'rc-image/lib/Preview';
import { render as reactRender, unmountComponentAtNode } from 'react-dom';

export default ({ url }: { url: string }) => {
  const container = document.createDocumentFragment();
  const icons = {
    rotateLeft: <RotateLeftOutlined />,
    rotateRight: <RotateRightOutlined />,
    zoomIn: <ZoomInOutlined />,
    zoomOut: <ZoomOutOutlined />,
    close: <CloseOutlined />,
    left: <LeftOutlined />,
    right: <RightOutlined />,
  };

  const destroy = () => {
    unmountComponentAtNode(container);
  };

  const render = () => {
    document.body.appendChild(container);
    reactRender(
      <Preview
        prefixCls={'ant-image-preview'}
        src={url}
        icons={icons}
        onClose={destroy}
        visible={true}
      />,
      container,
    );
  };
  render();
  return {
    destroy,
  };
};
