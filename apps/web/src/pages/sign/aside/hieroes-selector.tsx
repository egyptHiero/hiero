import React from 'react';
import { CButton, CButtonGroup } from '@coreui/react';
import { Hiero } from '../../../components/hiero';
import { Divider } from './divider';
import { useTranslation } from 'react-i18next';

export const HieroesSelector: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex row text-center">
      <div className="d-flex justify-content-center">
        <div className="text-end flex-shrink-0">
          <CButton type="button" className="btn-outline">
            <Hiero text={'A12'} fontSize={45} />
          </CButton>
          <Divider />
        </div>
        <div style={{ width: 'min-content' }}>
          <CButton type="button" className="btn-outline">
            <Hiero text={'A12'} fontSize={45} />
          </CButton>
        </div>
        <div className="text-start flex-shrink-0">
          <Divider />
          <CButton type="button" className="btn-outline">
            <Hiero text={'A12'} fontSize={45} />
          </CButton>
        </div>
      </div>
      <CButtonGroup vertical>
        <CButtonGroup className="pt-2">
          <CButton className="btn-outline">{t('btn.insertLeft')}</CButton>
          <CButton className="btn-outline">{t('btn.delete')}</CButton>
          <CButton className="btn-outline">{t('btn.insertRight')}</CButton>
        </CButtonGroup>
        <CButtonGroup className="">
          <CButton className="btn-outline">{t('btn.redo')}</CButton>
          <CButton className="btn-outline">{t('btn.undo')}</CButton>
        </CButtonGroup>
      </CButtonGroup>
    </div>
  );
};

HieroesSelector.displayName = 'HieroesSelector';
