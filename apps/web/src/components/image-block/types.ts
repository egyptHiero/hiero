export interface ImageSize {
  width: number;
  height: number;
}

interface ImageClipRectData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  angle: number;
  zoom: number;
  contrast: number;
  saturate: number;
}

export interface ImageClipSwitchData {
  invert: boolean;
  mirror: boolean;
}

export type ImageClipData = ImageClipRectData & ImageClipSwitchData;

export type ImageClipRectDataNames = keyof ImageClipRectData;
export type ImageClipSwitchDataNames = keyof ImageClipSwitchData;
export type ImageClipDataNames = keyof ImageClipData;
