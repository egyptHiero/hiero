import * as React from 'react';
import { ReactEventHandler, useState } from 'react';
import { CContainer, CImage, CRow } from '@coreui/react';
import { StyledImageContainer } from './styled';
import { ImageClip, ImageSize } from './types';
import { ClipRange } from './clip-range';

interface IImageBlockProps {
  image: string;
}

const ImageClipNames: Array<keyof ImageClip> = [
  'x1',
  'zoom',
  'x2',
  'angle',
  'y1',
  'contrast',
  'y2',
  'saturate',
  'invert',
];

export const ImageBlock: React.FC<IImageBlockProps> = ({ image }) => {
  const [imageSize, setImageSize] = useState<ImageSize>({
    width: 0,
    height: 0,
  });

  const [imageClip, setImageClip] = useState<ImageClip>({
    angle: 0,
    contrast: 100,
    invert: false,
    saturate: 0,
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    zoom: 100,
  });

  const imageLoadHandler = React.useCallback<
    ReactEventHandler<HTMLImageElement>
  >(({ target }) => {
    const img = target as HTMLImageElement;
    setImageSize({ width: img.width, height: img.height });
  }, []);

  return (
    <CContainer>
      {
        <CRow>
          {ImageClipNames.map((name) => (
            <ClipRange
              key={name}
              name={name as keyof ImageClip}
              imageClip={imageClip}
              imageSize={imageSize}
              setImageClip={setImageClip}
            />
          ))}
        </CRow>
      }
      <CContainer className="overflow-auto p-0">
        <StyledImageContainer size={imageSize} fragment={imageClip}>
          <div>
            <div>
              <CImage src={`rosetta/${image}`} onLoad={imageLoadHandler} />
            </div>
          </div>
        </StyledImageContainer>
      </CContainer>
    </CContainer>
  );
};

ImageBlock.displayName = 'ImageBlock';
