import * as React from 'react';
import { ChangeEventHandler } from 'react';
import { ImageClip, ImageSize } from './types';
import {
  CCol,
  CFormInput,
  CFormSwitch,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react';
import { ScaledFormRange } from './scaled-form-range';

interface IClipRangeProps {
  imageSize: ImageSize;
  imageClip: ImageClip;
  setImageClip: React.Dispatch<React.SetStateAction<ImageClip>>;
  name: keyof ImageClip;
}

export const ClipRange: React.FC<IClipRangeProps> = ({
  imageSize,
  imageClip,
  setImageClip,
  name,
}) => {
  const minMax = React.useMemo(() => {
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

  const [min, max] = minMax;

  const setRangeValue = React.useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      setImageClip((value) => ({
        ...value,
        [name]: Number.parseInt(target.value),
      }));
    },
    [name, setImageClip],
  );

  const setChecked = React.useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      setImageClip((value) => {
        return {
          ...value,
          [name]: target.checked,
        };
      });
    },
    [name, setImageClip],
  );

  const setInputValue = React.useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      setImageClip((clipValue) => {
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
    [max, min, name, setImageClip],
  );

  return (
    <CCol md={6}>
      {name === 'invert' ? (
        <CFormSwitch
          value={imageClip[name]?.toString()}
          onChange={setChecked}
        />
      ) : (
        <CInputGroup className="d-flex flex-nowrap">
          <CInputGroupText style={{ width: '110px' }}>{name}</CInputGroupText>
          <CFormInput
            value={imageClip[name]}
            onChange={setInputValue}
            style={{ width: '90px' }}
          />
          {
            <div className="mx-2 w-100">
              <ScaledFormRange
                min={min}
                max={max}
                value={imageClip[name] as number}
                onChange={setRangeValue}
              />
            </div>
          }
        </CInputGroup>
      )}
    </CCol>
  );
};

ClipRange.displayName = 'ClipRange';
