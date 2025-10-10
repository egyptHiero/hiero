import * as React from 'react';
import { ReactEventHandler } from 'react';
import { ImageClipData, ImageSize } from './types';
import { CImage } from '@coreui/react';
import { StyledImageContainer } from './styled';

interface IClippedImageProps {
  src: string;
  imageSize?: ImageSize;
  setImageSize: React.Dispatch<React.SetStateAction<ImageSize | undefined>>;
  clipData: ImageClipData;
}

const ImageContainer: React.FC<
  React.PropsWithChildren<Pick<IClippedImageProps, 'imageSize' | 'clipData'>>
> = ({ imageSize, clipData, children }) => {
  return imageSize ? (
    <StyledImageContainer size={imageSize} clipData={clipData}>
      <div>
        <div>{children}</div>
      </div>
    </StyledImageContainer>
  ) : (
    <div>{children}</div>
  );
};

export const ClippedImage: React.FC<IClippedImageProps> = ({
  src,
  imageSize,
  setImageSize,
  clipData,
}) => {
  const imageLoadHandler = React.useCallback<
    ReactEventHandler<HTMLImageElement>
  >(
    ({ target }) => {
      const img = target as HTMLImageElement;
      setImageSize({ width: img.width, height: img.height });
    },
    [setImageSize],
  );

  return (
    <ImageContainer imageSize={imageSize} clipData={clipData}>
      <CImage src={src} onLoad={imageLoadHandler} />
    </ImageContainer>
  );
};

ClippedImage.displayName = 'ClippedImage';
