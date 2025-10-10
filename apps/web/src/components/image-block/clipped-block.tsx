import * as React from 'react';
import { CContainer } from '@coreui/react';
import { ClippedImageFilters } from './clipped-filters';
import { ClippedImage } from './clipped-image';
import { ImageClipData, ImageSize } from './types';
import { createClippedData } from './logic';

interface IClippedImageBlockProps {
  src: string;
  clipData?: ImageClipData;
}

export const ClippedImageBlock: React.FC<IClippedImageBlockProps> = ({
  src,
  clipData: initialClippedData = createClippedData(),
}) => {
  const [imageSize, setImageSize] = React.useState<ImageSize>();
  const [clipData, setClipData] =
    React.useState<ImageClipData>(initialClippedData);

  return (
    <CContainer>
      {imageSize && (
        <ClippedImageFilters
          imageSize={imageSize}
          clipData={clipData}
          setClipData={setClipData}
        />
      )}
      <CContainer>
        <CContainer className="overflow-auto p-0">
          <ClippedImage
            imageSize={imageSize}
            setImageSize={setImageSize}
            src={src}
            clipData={clipData}
          />
        </CContainer>
      </CContainer>
    </CContainer>
  );
};

ClippedImageBlock.displayName = 'ClippedImageBlock';
