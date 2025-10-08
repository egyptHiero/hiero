import React, { useState } from 'react';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react';
import { ImageBlock } from './image-block';

const tabs: [string, string] = ['rosetta-hieroes1.png', 'rosetta-hieroes2.png'];

export const ImageTabs: React.FC = () => {
  const [imageTab, setImageTab] = useState<string>(tabs[0]);

  const getTabName = React.useCallback((tab: string) => {
    switch (tab) {
      case 'rosetta-hieroes1.png':
        return 'image1';
      case 'rosetta-hieroes2.png':
        return 'image2';
      default:
        return '';
    }
  }, []);

  return (
    <CNav variant="tabs">
      {tabs.map((tab) => (
        <CNavItem key={tab}>
          <CNavLink
            active={imageTab === tab}
            role="button"
            onClick={() => setImageTab(tab)}
          >
            {getTabName(tab)}
          </CNavLink>
        </CNavItem>
      ))}
      <CTabContent>
        <CTabPane role="tabpanel" visible={imageTab === tabs[0]}>
          <ImageBlock image={imageTab} />
        </CTabPane>
        <CTabPane role="tabpanel" visible={imageTab === tabs[1]}>
          <ImageBlock image={imageTab} />
        </CTabPane>
      </CTabContent>
    </CNav>
  );
};

ImageTabs.displayName = 'ImageTabs';
