## DEMO

默认上传事件，具体配置参考 [ProFormUpload](https://procomponents.ant.design/components/field-set#proformuploaddragger)

```jsx
import { ProForm } from '@ant-design/pro-components';
import { ProFormCropUpload } from '@/components';
import { postCommonFileUpload } from '@/services/api';

export default () => {
  return (
    <ProForm>
      <ProFormCropUpload
        name={['pictures', 'album']}
        label="学校相册"
        max={6}
        uploadType={'dragger'}
        rules={[{ required: true, message: '请上传学校相册' }]}
        accept="image/*"
        action={`${APP_API_HOST}/common/aliyunoss`}
        onChange={handleImageChange}
        fieldProps={{
          onPreview: handlePreview,
          name: 'file',
          headers: {
            Authorization: `Bearer ${storage.get(TOKEN)}`.replace(/"/g, ''),
          },
        }}
        extra="仅限JPG、PNG格式图片，大小不超过1MB，最多支持 6 张图册"
      />
    </ProForm>
  );
};
```

自定义上传事件

```jsx
import { ProForm } from '@ant-design/pro-components';
import { ProFormCropUpload } from '@/components';
import { postCommonFileUpload } from '@/services/api';

export default () => {
  return (
    <ProForm>
      <ProFormCropUpload
        name={['pictures', 'cover']}
        label="学校封面"
        max={1}
        rules={[{ required: true, message: '请上传学校封面' }]}
        accept="image/*"
        onChange={handleImageChange}
        cropProps={{
          aspect: 1,
        }}
        fieldProps={{
          onPreview: handlePreview,
          listType: 'picture-card',
          customRequest: ({
            filename,
            file,
            data,
            headers,
            onSuccess,
            onError,
            withCredentials,
          }: any) => {
            const formData = new FormData();
            if (data) {
              Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
              });
            }
            formData.append(filename, file);
            postCommonFileUpload(formData, { withCredentials, headers })
              .then((response) => {
                onSuccess(response, file);
              })
              .catch(onError);
            return {
              abort() {
                console.log('upload progress is aborted.');
              },
            };
          },
        }}
        extra="仅限JPG、PNG格式图片，大小不超过1MB"
      />
      <ProFormImageCrop
        name={['pictures', 'album']}
        label="学校相册"
        max={6}
        uploadType={'dragger'}
        rules={[{ required: true, message: '请上传学校相册' }]}
        accept="image/*"
        action={`${APP_API_HOST}/common/aliyunoss`}
        onChange={handleImageChange}
        fieldProps={{
          onPreview: handlePreview,
          name: 'file',
          headers: {
            Authorization: `Bearer ${storage.get(TOKEN)}`.replace(/"/g, ''),
          },
        }}
        extra="仅限JPG、PNG格式图片，大小不超过1MB，最多支持 6 张图册"
      />
    </ProForm>
  );
};
```
