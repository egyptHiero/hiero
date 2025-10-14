import * as React from 'react';
import { ClippedImageBlock } from './clipped-block';
import { useFormContext } from 'react-hook-form';
import { RosettaBlocksDto } from '../../types';
import { createClippedData } from './logic';

interface IFormClippedBlockProps {
  index: number;
}

export const FormClippedImageBlock: React.FC<IFormClippedBlockProps> = ({
  index,
}) => {
  const { setValue, watch } = useFormContext<RosettaBlocksDto>();

  const images = watch('images');
  const image = images?.[index];
  const [clippedData, setClippedData] = React.useState(() => {
    try {
      return image?.json ? JSON.parse(image.json) : createClippedData();
    } catch {
      return createClippedData();
    }
  });

  React.useEffect(() => {
    if (image) {
      image.json = JSON.stringify(clippedData);
      setValue('images', [...images]);
    }
  }, [clippedData, setValue]);

  if (!image) {
    return null;
  }

  return (
    <ClippedImageBlock
      src={image.src}
      clippedData={clippedData}
      setClipData={setClippedData}
    />
  );
};

FormClippedImageBlock.displayName = 'FormClippedImageBlock';
