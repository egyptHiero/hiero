import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { TranslationVO } from '../types';
import { useGetChains } from '../hooks';
import { TranslationTabHieroesLine } from '../ui/tab-hieroes-line';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react';
import { splitIntoLines } from '../../../utils';

export const TranslationTabHieroes: React.FC = () => {
  const { watch } = useFormContext<TranslationVO>();
  const gardinerCodes = watch('signData.gardinerCodes');
  const lines = React.useMemo(
    () => splitIntoLines(gardinerCodes),
    [gardinerCodes],
  );

  const [dictionaries] = React.useState([
    'hieroglyphs',
    'ancient',
    'rosetta',
    'vygus',
  ]);

  const chainsResponse = useGetChains(
    dictionaries,
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
              dictionaries={dictionaries}
              line={line}
              lineIndex={index + 1}
            />
          </CTabPane>
        ))}
      </CTabContent>
    </div>
  );
};

TranslationTabHieroes.displayName = 'TranslationHieroes';
