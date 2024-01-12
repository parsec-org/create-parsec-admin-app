import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { UploadProps } from 'antd';
import { Button, Col, Modal, Row, Slider, Space, Upload } from 'antd';
import type {
  ProFormUploadButtonProps,
  ProFormUploadDraggerProps,
} from '@ant-design/pro-components';
import {
  ProCard,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import Cropper from 'react-easy-crop';
import type { CropperProps } from 'react-easy-crop';
import type { RcFile } from 'antd/es/upload';
import {
  INIT_ROTATE,
  INIT_ZOOM,
  MAX_ROTATE,
  MIN_ROTATE,
  PREFIX,
  ROTATE_STEP,
  ZOOM_STEP,
} from '@/components/ProFormCropUpload/constants';
import getCroppedImg from '@/components/ProFormCropUpload/cropImage';
import {
  MinusOutlined,
  PlusOutlined,
  RedoOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Area, Point } from 'react-easy-crop/types';

const ProFormCropUpload: React.FC<
  Pick<ProFormUploadButtonProps | ProFormUploadDraggerProps, any> & {
    uploadType?: 'button' | 'dragger';
    cropProps?: Partial<Omit<CropperProps, 'zoom' | 'rotation'>>;
  }
> = React.forwardRef((props, ref: any) => {
  /**
   * Upload
   */
  const [image, setImage] = useState('');
  const fileRef = useRef<RcFile>();
  const beforeUploadRef = useRef<UploadProps['beforeUpload']>();
  const resolveRef =
    useRef<(file: void | boolean | string | Blob | File) => void>();
  const rejectRef = useRef<(err: Error) => void>();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(INIT_ROTATE);
  const [zoom, setZoom] = useState<number>(INIT_ZOOM);
  const [croppedImage, setCroppedImage] = useState<any>(null);

  const {
    uploadType,
    fieldProps,
    cropProps = {
      aspect: 1,
      cropShape: 'rect',
      quality: 0.5,
      showGrid: true,
      minZoom: 1,
      maxZoom: 5,
      fillColor: '',
    },
    ...reset
  } = props;
  const {
    aspect,
    cropShape,
    showGrid,
    minZoom = 1,
    maxZoom = 5,
    ...resetCrop
  } = cropProps;
  const [isModalOpen, setIsModalOpen] = useState<boolean>();

  const getUploadProps = useCallback(
    (file: RcFile) => {
      beforeUploadRef.current = fieldProps?.beforeUpload;
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
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
    [beforeUploadRef, resolveRef, rejectRef, fileRef],
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
  }, []);

  const onCancel = useCallback(() => {
    setImage('');
    setIsModalOpen(false);
    setRotation(INIT_ROTATE);
    setZoom(INIT_ZOOM);
    setCroppedImage(null);
  }, []);

  const onOk = useCallback(async () => {
    onCancel();
    // get the new image
    // @ts-ignore
    const { type, name, uid } = fileRef.current;
    const imgBlob = await fetch(croppedImage).then((r) => r.blob());
    const newFile = Object.assign(new File([imgBlob], name, { type }), {
      uid,
    }) as RcFile;

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
      return rejectRef?.current?.(
        new Error('custom beforeUpload return false'),
      );
    }

    if (result === Upload.LIST_IGNORE) {
      Object.defineProperty(newFile, Upload.LIST_IGNORE, {
        value: true,
        configurable: true,
      });
      console.error('custom beforeUpload return LIST_IGNORE');
      return rejectRef?.current?.(
        new Error('custom beforeUpload return LIST_IGNORE'),
      );
    }

    if (typeof result === 'object' && result !== null) {
      return resolveRef?.current?.(result);
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
          const _croppedImage = await getCroppedImg(
            image,
            croppedAreaPixels,
            rotation,
          );
          setCroppedImage(_croppedImage || '');
        } else {
          setCroppedImage(null);
        }
      } catch (e) {
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
        destroyOnClose
        footer={false}
        open={isModalOpen}
        width={980}
        onCancel={() => onCancel()}
        onOk={onOk}
      >
        <ProCard.Group className={`${PREFIX}-container-warp`}>
          <ProCard
            style={{ height: 460 }}
            bodyStyle={{ paddingInline: 0, paddingBlock: 0 }}
            colSpan={14}
          >
            <Cropper
              ref={ref}
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
                containerClassName: `${PREFIX}-container`,
                mediaClassName: `${PREFIX}-media`,
              }}
              {...resetCrop}
            />
          </ProCard>
          <ProCard.Divider />
          <ProCard
            style={{ height: 460 }}
            bodyStyle={{
              paddingInlineStart: 0,
              paddingInlineEnd: 16,
              paddingBlock: 0,
            }}
            colSpan={10}
          >
            <div className={`${PREFIX}-preview-warp`}>
              <img src={croppedImage} alt="Cropped" />
            </div>
            <Row gutter={24}>
              <Col
                span={24}
                className={`${PREFIX}-control ${PREFIX}-control-zoom`}
              >
                <Button
                  icon={<MinusOutlined />}
                  size={'middle'}
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
                  size={'middle'}
                  onClick={() => setZoom(zoom + ZOOM_STEP)}
                  disabled={zoom + ZOOM_STEP > maxZoom}
                />
              </Col>
              <Col
                span={24}
                className={`${PREFIX}-control ${PREFIX}-control-rotate`}
              >
                <Button
                  icon={<UndoOutlined />}
                  size={'middle'}
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
                  size={'middle'}
                  onClick={() => setRotation(rotation + ROTATE_STEP)}
                  disabled={rotation === MAX_ROTATE}
                />
              </Col>
            </Row>
            <Space align={'end'} className={`${PREFIX}-control-btn-warp`}>
              <Button onClick={onCancel}>取消</Button>
              <Button
                type={'primary'}
                disabled={croppedImage === null}
                onClick={onOk}
              >
                确认
              </Button>
            </Space>
          </ProCard>
        </ProCard.Group>
      </Modal>
    </>
  );
});

export default ProFormCropUpload;
