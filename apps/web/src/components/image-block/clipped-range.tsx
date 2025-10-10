import * as React from 'react';
import { ChangeEventHandler } from 'react';
import { ImageClipData, ImageClipRectDataNames, ImageSize } from './types';
import { ScaledRangeWithValue } from '../../controls/form/range/scaled-range-with-value';
import { useGetMinMax } from './hooks';

interface IClippedImageDetailsProps {
  name: ImageClipRectDataNames;
  imageSize: ImageSize;
  clipData: ImageClipData;
  setClipData: React.Dispatch<React.SetStateAction<ImageClipData>>;
}

export const ClippedImageRange: React.FC<IClippedImageDetailsProps> = ({
  name,
  imageSize,
  clipData,
  setClipData,
}) => {
  const [min, max] = useGetMinMax(name, imageSize, clipData);

  const setRangeValue = React.useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      setClipData((clipValue) => {
        let value = Number.parseInt(target.value);
        if (isNaN(value)) {
          return clipValue;
        }

        if (max !== undefined && value > max) {
          value = max;
        }

        if (min !== undefined && value < min) {
          value = min;
        }

        return {
          ...clipValue,
          [name]: value,
        };
      });
    },
    [max, min, name, setClipData],
  );

  return (
    <ScaledRangeWithValue
      key={name}
      min={min}
      max={max}
      name={name}
      label={name}
      value={clipData[name]}
      onChange={setRangeValue}
    />
  );
};

ClippedImageRange.displayName = 'ClippedImageRange';
