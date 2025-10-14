import * as React from 'react';
import { CContainer } from '@coreui/react';
import { ClippedImageFilters } from './clipped-filters';
import { ClippedImage } from './clipped-image';
import { ImageClipData, ImageSize } from './types';

interface IClippedImageBlockProps {
  src: string;
  clippedData: ImageClipData;
  setClipData: React.Dispatch<React.SetStateAction<ImageClipData>>;
}

export const ClippedImageBlock: React.FC<IClippedImageBlockProps> = ({
  src,
  clippedData,
  setClipData,
}) => {
  const [imageSize, setImageSize] = React.useState<ImageSize>();

  return (
    <CContainer>
      {imageSize && (
        <ClippedImageFilters
          imageSize={imageSize}
          clipData={clippedData}
          setClipData={setClipData}
        />
      )}
      <CContainer>
        <CContainer className="overflow-auto p-0">
          <ClippedImage
            imageSize={imageSize}
            setImageSize={setImageSize}
            src={src}
            clipData={clippedData}
          />
        </CContainer>
      </CContainer>
    </CContainer>
  );
};

ClippedImageBlock.displayName = 'ClippedImageBlock';
