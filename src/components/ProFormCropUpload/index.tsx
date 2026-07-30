import type {
  ProFormUploadButtonProps,
  ProFormUploadDraggerProps,
} from '@ant-design/pro-components';
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { Area, CropperProps, Point } from 'react-easy-crop';
import { MinusOutlined, PlusOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { ProCard, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import { Button, Col, Modal, Row, Slider, Space, Upload } from 'antd';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import {
  INIT_ROTATE,
  INIT_ZOOM,
  MAX_ROTATE,
  MIN_ROTATE,
  ROTATE_STEP,
  ZOOM_STEP,
} from '@/components/ProFormCropUpload/constants';
import getCroppedImg from '@/components/ProFormCropUpload/cropImage';
import { useStyles } from './styles';

type BeforeUploadValueType = void | boolean | string | Blob | File;

const ProFormCropUpload: React.FC<
  (ProFormUploadButtonProps | ProFormUploadDraggerProps) & {
    uploadType?: 'button' | 'dragger';
    cropProps?: Partial<Omit<CropperProps, 'zoom' | 'rotation'>>;
  }
> = (props) => {
  const { styles } = useStyles();
  /**
   * Upload
   */
  const [image, setImage] = useState('');
  const fileRef = useRef<RcFile>(undefined);
  const beforeUploadRef = useRef<UploadProps['beforeUpload']>(undefined);
  const resolveRef = useRef<(file: void | boolean | string | Blob | File) => void>(undefined);
  const rejectRef = useRef<(err: Error) => void>(undefined);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(INIT_ROTATE);
  const [zoom, setZoom] = useState<number>(INIT_ZOOM);
  const [croppedImage, setCroppedImage] = useState<string>();

  const {
    uploadType,
    fieldProps,
    cropProps = {
      aspect: 1,
      cropShape: 'rect',
      showGrid: true,
      minZoom: 1,
      maxZoom: 5,
    },
    ...reset
  } = props;
  const { aspect, cropShape, showGrid, minZoom = 1, maxZoom = 5, ...resetCrop } = cropProps;
  const [isModalOpen, setIsModalOpen] = useState<boolean>();

  const getUploadProps = useCallback(
    (file: RcFile): BeforeUploadValueType | Promise<BeforeUploadValueType> => {
      beforeUploadRef.current = fieldProps?.beforeUpload;
      return new Promise((resolve, reject) => {
        fileRef.current = file;
        resolveRef.current = (newFile) => {
          resolve(newFile);
        };
        rejectRef.current = (uploadErr) => {
          console.log('uploadErr', uploadErr);
          reject(uploadErr);
          return Upload.LIST_IGNORE; // 阻止列表展现
        };

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          if (typeof reader.result === 'string') {
            setImage(reader.result);
            setIsModalOpen(true);
          }
        });
        reader.readAsDataURL(file);
      });
    },
    [fieldProps],
  );

  const renderFormItem = useMemo(() => {
    if (uploadType === 'dragger') {
      return (
        <ProFormUploadDragger
          fieldProps={{
            ...fieldProps,
            beforeUpload: async (file) => {
              return getUploadProps(file);
            },
          }}
          {...reset}
        />
      );
    }
    return (
      <ProFormUploadButton
        fieldProps={{
          ...fieldProps,
          beforeUpload: async (file) => {
            return getUploadProps(file);
          },
        }}
        {...reset}
      />
    );
  }, [uploadType, fieldProps, reset, getUploadProps]);

  const onCancel = useCallback(() => {
    setImage('');
    setIsModalOpen(false);
    setRotation(INIT_ROTATE);
    setZoom(INIT_ZOOM);
    setCroppedImage(undefined);
  }, []);

  const onOk = useCallback(async () => {
    if (croppedImage) {
      // get the new image
      // @ts-ignore
      const { type, name, uid } = fileRef.current;
      const imgBlob = await fetch(croppedImage).then(r => r.blob());
      const newFile = Object.assign(new File([imgBlob], name, { type }), {
        uid,
      }) as RcFile;

      // 裁剪完成后先清理弹窗状态，再走上传流程
      onCancel();

      // 没有自定义 beforeUpload 则直接返回裁剪后的图片
      if (!beforeUploadRef.current) {
        return resolveRef?.current?.(newFile);
      }

      const result = await beforeUploadRef.current(newFile, [newFile]);

      if (result === true) {
        console.log('1');
        return resolveRef?.current?.(newFile);
      }

      if (result === false) {
        console.error('custom beforeUpload return false');
        return rejectRef?.current?.(new Error('custom beforeUpload return false'));
      }

      if (result === Upload.LIST_IGNORE) {
        Object.defineProperty(newFile, Upload.LIST_IGNORE, {
          value: true,
          configurable: true,
        });
        console.error('custom beforeUpload return LIST_IGNORE');
        return rejectRef?.current?.(new Error('custom beforeUpload return LIST_IGNORE'));
      }

      if (typeof result === 'object' && result !== null) {
        return resolveRef?.current?.(result);
      }
    }
  }, [croppedImage, resolveRef, rejectRef, beforeUploadRef]);

  /**
   * croppedArea: 裁剪区域的坐标和尺寸占介质尺寸的百分比
   * croppedAreaPixels:裁剪区域的坐标和尺寸（以像素为单位）。
   */
  const onCropComplete = useCallback(
    async (croppedArea: Area, croppedAreaPixels: Area) => {
      try {
        if (croppedAreaPixels) {
          const _croppedImage: string | null = await getCroppedImg(image, croppedAreaPixels, rotation);
          setCroppedImage(_croppedImage || undefined);
        }
        else {
          setCroppedImage(undefined);
        }
      }
      catch (e) {
        console.error(e);
      }
    },
    [image, rotation],
  );

  return (
    <>
      {renderFormItem}
      <Modal
        closable={false}
        destroyOnHidden
        footer={false}
        open={isModalOpen}
        width={980}
        onCancel={() => onCancel()}
        onOk={onOk}
      >
        <ProCard.Group className={styles.container} variant="borderless">
          <ProCard
            style={{ height: 540 }}
            styles={{
              body: { paddingInline: 0, paddingBlock: 0 },
            }}
            colSpan={14}
            variant="borderless"
          >
            <Cropper
              image={image}
              crop={crop}
              cropShape={cropShape}
              rotation={rotation}
              showGrid={showGrid}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              // 此回调用于保存介质的裁剪区域。它传递了2个参数：
              onCropComplete={onCropComplete}
              // 这与onCropComplete完全相同，但对所有用户交互都会触发。如果未对其执行任何渲染操作，则可以使用它。
              // onCropAreaChange={onCropComplete}
              onZoomChange={setZoom}
              classes={{
                containerClassName: styles.cropperContainer,
                mediaClassName: styles.cropperMedia,
              }}
              {...resetCrop}
            />
          </ProCard>
          <ProCard.Divider />
          <ProCard
            style={{ height: 540 }}
            styles={{
              body: { paddingInlineStart: 0, paddingInlineEnd: 16, paddingBlock: 0 },
            }}
            variant="borderless"
            colSpan={10}
          >
            <div className={styles.preview}>
              <img src={croppedImage} alt="Cropped" />
            </div>
            <Row gutter={24}>
              <Col span={24} className={styles.controls}>
                <Button
                  icon={<MinusOutlined />}
                  size="middle"
                  onClick={() => setZoom(zoom - ZOOM_STEP)}
                  disabled={zoom - ZOOM_STEP < minZoom}
                />
                <Slider
                  min={minZoom}
                  max={maxZoom}
                  step={ZOOM_STEP}
                  value={zoom}
                  onChange={setZoom}
                />
                <Button
                  icon={<PlusOutlined />}
                  size="middle"
                  onClick={() => setZoom(zoom + ZOOM_STEP)}
                  disabled={zoom + ZOOM_STEP > maxZoom}
                />
              </Col>
              <Col span={24} className={styles.controls}>
                <Button
                  icon={<UndoOutlined />}
                  size="middle"
                  onClick={() => setRotation(rotation - ROTATE_STEP)}
                  disabled={rotation === MIN_ROTATE}
                />
                <Slider
                  min={MIN_ROTATE}
                  max={MAX_ROTATE}
                  step={ROTATE_STEP}
                  value={rotation}
                  onChange={setRotation}
                />
                <Button
                  icon={<RedoOutlined />}
                  size="middle"
                  onClick={() => setRotation(rotation + ROTATE_STEP)}
                  disabled={rotation === MAX_ROTATE}
                />
              </Col>
            </Row>
            <Space align="end" className={styles.controlsBtn}>
              <Button onClick={onCancel}>取消</Button>
              <Button type="primary" disabled={croppedImage === null} onClick={onOk}>
                确认
              </Button>
            </Space>
          </ProCard>
        </ProCard.Group>
      </Modal>
    </>
  );
};

export default ProFormCropUpload;
