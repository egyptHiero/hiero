import * as React from 'react';
import {
  ImageClipData,
  ImageClipRectDataNames,
  ImageClipSwitchDataNames,
  ImageSize,
} from './types';
import { CCol, CContainer, CRow } from '@coreui/react';
import { ClippedImageRange } from './clipped-range';
import { ClippedImageSwitch } from './clipped-switch';

interface IClippedImageFiltersProps {
  imageSize: ImageSize;
  clipData: ImageClipData;
  setClipData: React.Dispatch<React.SetStateAction<ImageClipData>>;
}

const imageClipRangeOrder: Array<ImageClipRectDataNames> = [
  'x1',
  'zoom',
  'x2',
  'angle',
  'y1',
  'contrast',
  'y2',
  'saturate',
];

const imageClipSwitchOrder: Array<ImageClipSwitchDataNames> = [
  'invert',
  'mirror',
];

export const ClippedImageFilters: React.FC<IClippedImageFiltersProps> = ({
  imageSize,
  clipData,
  setClipData,
}) => {
  return (
    <CContainer>
      <CRow>
        {imageClipRangeOrder.map((name) => (
          <CCol key={name} md={6}>
            <ClippedImageRange
              name={name}
              imageSize={imageSize}
              clipData={clipData}
              setClipData={setClipData}
            />
          </CCol>
        ))}
        {imageClipSwitchOrder.map((name) => (
          <CCol key={name} md={2}>
            <ClippedImageSwitch
              name={name}
              clipData={clipData}
              setClipData={setClipData}
            />
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
};

ClippedImageFilters.displayName = 'ClippedImageFilters';
