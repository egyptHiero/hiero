export interface ImageSize {
  width: number;
  height: number;
}

export interface ImageClip {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  angle: number;
  zoom: number;
  contrast: number;
  saturate: number;
  invert: boolean;
}
