import styled from '@emotion/styled';
import { ImageClipData, ImageSize } from './types';

export const StyledImageContainer = styled.div<{
  size: ImageSize;
  clipData: ImageClipData;
}>(({ size, clipData }) => {
  const { x1, x2, y1, y2, angle, zoom, contrast, saturate, invert, mirror } =
    clipData;
  const width = size.width - x1 - x2;
  const height = size.height - y1 - y2;

  return {
    overflow: 'hidden',
    position: 'relative',
    display: 'block',
    zoom: zoom / 100,
    width: width,
    height: height,
    left: 0,
    top: 0,
    div: {
      width: size.width,
      height: size.height,
      div: {
        left: -clipData.x1,
        top: -clipData.y1,
        position: 'relative',
        clipPath: `inset(${y1}px ${x2}px ${y2}px ${x1}px)`,
        img: {
          transform: `rotate(${angle}deg) ${mirror ? 'scaleX(-1)' : ''}`,
          filter: `contrast(${contrast / 100}) saturate(${saturate / 100}) ${invert ? 'invert()' : ''}`,
        },
      },
    },
  };
});
