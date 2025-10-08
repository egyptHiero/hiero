import React from 'react';
import classNames from 'classnames';
import { CImage } from '@coreui/react';
import { useHieroSelectorContext } from './context';

interface IHieroSelectorImageProps {
  image: string;
}

export const HieroSelectorImage: React.FC<IHieroSelectorImageProps> = ({
  image,
}) => {
  const { isImageLoaded, setImageIsLoaded } = useHieroSelectorContext();

  return (
    <CImage
      src={image}
      style={{ maxWidth: '100%' }}
      className={classNames({ 'd-none': !isImageLoaded })}
      onLoad={() => setImageIsLoaded(true)}
      onError={() => setImageIsLoaded(false)}
    />
  );
};

HieroSelectorImage.displayName = 'HieroSelectorImage';
