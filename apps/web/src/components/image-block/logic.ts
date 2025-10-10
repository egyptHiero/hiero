import { ImageClipData } from './types';

export const createClippedData = (): ImageClipData => {
  return {
    angle: 0,
    contrast: 100,
    invert: false,
    mirror: false,
    saturate: 0,
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    zoom: 100,
  };
};
