export const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * 返回旋转矩形的新边界区域。
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * 此函数改编自 https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0,
  flip = { horizontal: false, vertical: false },
) {
  const image = (await createImage(imageSrc)) as HTMLImageElement;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // 计算旋转图像的边界框
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation,
  );

  // 设置画布大小以匹配边界框
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.fillStyle = 'red';
  // 将画布上下文转换到中心位置，以允许围绕中心旋转和翻转
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // 绘制旋转图像
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels值相对于边界框
  // 使用这些值提取裁剪图像
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
  );

  // 将画布宽度设置为最终所需的裁剪大小-这将清除现有上下文
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // 在左上角粘贴生成的旋转图像
  ctx.putImageData(data, 0, 0);

  // As Base64 string
  // return canvas.toDataURL('image/png');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file: Blob | null) => {
      return resolve(URL.createObjectURL(file as Blob));
    }, 'image/png');
  });
}
