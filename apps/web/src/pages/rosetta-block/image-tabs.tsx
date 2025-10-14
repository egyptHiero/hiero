import React, { useState } from 'react';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react';
import { useFormContext } from 'react-hook-form';
import { RosettaBlocksDto } from '../../types';
import { FormClippedImageBlock } from '../../components/image-block/form-clipped-block';

export const ImageTabs: React.FC = () => {
  const [imageTab, setImageTab] = useState<number>(0);
  const { watch } = useFormContext<RosettaBlocksDto>();

  const images = watch('images');

  const getTabName = React.useCallback((tab: number) => {
    if (tab === 0) {
      return 'image1';
    } else if (tab === 1) {
      return 'image2';
    }
  }, []);

  return (
    <CNav variant="tabs">
      {images?.map((img, index) => (
        <CNavItem key={img.src}>
          <CNavLink
            active={imageTab === index}
            role="button"
            onClick={() => setImageTab(index)}
          >
            {getTabName(index)}
          </CNavLink>
        </CNavItem>
      ))}
      <CTabContent>
        {images?.map((img, index) => (
          <CTabPane key={img.src} role="tabpanel" visible={imageTab === index}>
            <FormClippedImageBlock index={index} />
          </CTabPane>
        ))}
      </CTabContent>
    </CNav>
  );
};

ImageTabs.displayName = 'ImageTabs';
