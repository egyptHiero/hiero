import styled from '@emotion/styled';
import { ImageClip, ImageSize } from './types';

export const StyledGrid = styled.div({
  display: 'grid',
  justifyContent: 'start',
  justifyItems: 'center',
  overflowY: 'auto',
  gap: 2,
  '& > *': {
    padding: 5,
    border: '1px solid #ccc',
    textAlign: 'center',
  },
});

export const StyledImageContainer = styled.div<{
  size: ImageSize;
  fragment: ImageClip;
}>(({ size, fragment }) => {
  const { x1, x2, y1, y2, angle, zoom, contrast, saturate, invert } = fragment;
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
        left: -fragment.x1,
        top: -fragment.y1,
        position: 'relative',
        clipPath: `inset(${y1}px ${x2}px ${y2}px ${x1}px)`,
        img: {
          transform: `rotate(${angle}deg)`,
          filter: `contrast(${contrast / 100}) saturate(${saturate / 100}) ${invert ? 'invert()' : ''}`,
        },
      },
    },
  };
});
