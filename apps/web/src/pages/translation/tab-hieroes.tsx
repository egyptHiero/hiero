import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { TranslationVO } from './types';
import { splitIntoLines } from '../sign/logic';
import { useGetChains } from './hooks';
import { TranslationTabHieroesLine } from './tab-hieroes-line';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react';

export const TranslationTabHieroes: React.FC = () => {
  const { watch } = useFormContext<TranslationVO>();
  const gardinerCodes = watch('signData.classification');
  const lines = React.useMemo(
    () => splitIntoLines(gardinerCodes),
    [gardinerCodes],
  );

  const chainsResponse = useGetChains(
    ['ancient', 'vygus'],
    lines?.map(({ hieroes }) => hieroes),
  );
  const chains = React.useMemo(
    () => chainsResponse?.data?.data?.chains ?? {},
    [chainsResponse?.data?.data],
  );

  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className="d-flex">
      <CNav variant="enclosed" className="flex-column">
        {lines.map((_, index) => (
          <CNavItem key={index}>
            <CNavLink
              active={activeTab === index}
              role="button"
              onClick={() => setActiveTab(index)}
            >
              {index + 1}
            </CNavLink>
          </CNavItem>
        ))}
      </CNav>
      <CTabContent className="flex-fill">
        {lines.map((line, index) => (
          <CTabPane key={index} role="tabpanel" visible={activeTab === index}>
            <TranslationTabHieroesLine
              chains={chains}
              line={line}
              lineIndex={index}
            />
          </CTabPane>
        ))}
      </CTabContent>
    </div>
  );
};

TranslationTabHieroes.displayName = 'TranslationHieroes';
