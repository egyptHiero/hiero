import React from 'react';
import { ImageClipData, ImageClipDataNames, ImageSize } from './types';

export const useGetMinMax = (
  name: ImageClipDataNames,
  imageSize: ImageSize,
  imageClip: ImageClipData,
) =>
  React.useMemo<[number, number]>(() => {
    switch (name) {
      case 'x1':
        return [0, imageSize.width - imageClip.x2];
      case 'x2':
        return [0, imageSize.width - imageClip.x1];
      case 'y1':
        return [0, imageSize.height - imageClip.y2];
      case 'y2':
        return [0, imageSize.height - imageClip.y1];
      case 'zoom':
        return [0, 500];
      case 'angle':
        return [-180, 180];
      case 'contrast':
        return [0, 500];
      case 'saturate':
        return [0, 200];
      default:
        return [0, 0];
    }
  }, [
    imageClip.x1,
    imageClip.x2,
    imageClip.y1,
    imageClip.y2,
    imageSize.height,
    imageSize.width,
    name,
  ]);
