import * as React from 'react';
import { ChangeEventHandler } from 'react';
import { ImageClipData, ImageClipSwitchDataNames } from './types';
import { CFormSwitch } from '@coreui/react';

interface IClippedImageSwitchProps {
  name: ImageClipSwitchDataNames;
  clipData: ImageClipData;
  setClipData: React.Dispatch<React.SetStateAction<ImageClipData>>;
}

export const ClippedImageSwitch: React.FC<IClippedImageSwitchProps> = ({
  name,
  clipData,
  setClipData,
}) => {
  const setChecked = React.useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      setClipData((value) => {
        return {
          ...value,
          [name]: target.checked,
        };
      });
    },
    [name, setClipData],
  );

  return (
    <div>
      <CFormSwitch
        label={name}
        name={name}
        checked={clipData[name]}
        onChange={setChecked}
      />
    </div>
  );
};

ClippedImageSwitch.displayName = 'ClippedImageSwitch';
