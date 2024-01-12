import type { UploadFile, UploadProps } from 'antd';
import previewImage from '@/utils/previewImage';

// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

/**
 * 格式化上传图标后返回的数据
 * @param info
 */
export const handleImageChange: UploadProps['onChange'] = (info) => {
  let newFileList = [...info.fileList];

  // 1. 限制上传文件的数量
  // 只显示一个最近上传的文件，旧的将被新的替换
  newFileList = newFileList.slice(-1);

  // 2. 从响应中读取并显示文件链接
  newFileList.map((file) => {
    if (file.status === 'done' && file.response) {
      // 组件将 file.url 显示为链接
      if (
        file.response.hasOwnProperty('url') ||
        file.response.hasOwnProperty('relativePath')
      ) {
        file.url =
          APP_API_HOST + '/' + file.response.relativePath || file.response.url;
      }
      if (file.response.hasOwnProperty('data')) {
        file.url = file.response.data;
      }
    }
    return file;
  });
};

/**
 * 上传图标的图片预览
 * @param file
 */
export const handlePreview = (file: UploadFile) => {
  let src = file.url as string;
  if (src) {
    previewImage({ url: src });
  }
};
