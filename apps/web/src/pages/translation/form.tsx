import React from 'react';
import {
  CForm,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react';
import { SignDto, TranslationDto } from '../../types/types';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useSaveMutation } from './hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { TranslationTabData } from './tab-data';
import { TranslationVO } from './types';
import { TranslationButtons } from './buttons';
import { TranslationTabHieroes } from './tab-hieroes';
import { useTranslation } from 'react-i18next';

interface IFormProps {
  translationId: string;
  signData?: SignDto;
  data?: TranslationDto;
}

type Tabs = 'data' | 'sign' | 'hieroes';
const tabs: Tabs[] = ['data', 'sign', 'hieroes'];

export const TranslationForm: React.FC<IFormProps> = ({
  translationId,
  data,
  signData,
}) => {
  const navigate = useNavigate();
  const saveTranslation = useSaveMutation();
  const [activeTab, setActiveTab] = React.useState<Tabs>('data');
  const { t } = useTranslation();

  const getTabName = (tab: Tabs) => {
    switch (tab) {
      case 'data':
        return t('translation.tab.data');
      case 'sign':
        return t('translation.tab.sign');
      case 'hieroes':
        return t('translation.tab.hieroes');
    }
  };

  const formMethods = useForm<TranslationVO>({
    values: {
      sign: signData?.id,
      signData: signData,
      ...(data ?? {}),
    } as TranslationVO,
  });

  const onSubmit = (values: TranslationDto) => {
    saveTranslation.mutateAsync(values, {
      onSuccess: () => navigate(generatePath(ROUTES.TRANSLATION_LIST)),
    });
  };

  return (
    <FormProvider {...formMethods}>
      <CForm
        noValidate
        className="row g-3"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <CNav variant="tabs" className="justify-content-end">
          {tabs.map((tab) => (
            <CNavItem key={tab}>
              <CNavLink
                active={activeTab === tab}
                role="button"
                onClick={() => setActiveTab(tab)}
              >
                {getTabName(tab)}
              </CNavLink>
            </CNavItem>
          ))}
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" visible={activeTab === 'data'}>
            <TranslationTabData />
          </CTabPane>
          <CTabPane role="tabpanel" visible={activeTab === 'sign'}></CTabPane>
          <CTabPane role="tabpanel" visible={activeTab === 'hieroes'}>
            <TranslationTabHieroes />
          </CTabPane>
        </CTabContent>
        <TranslationButtons />
      </CForm>
    </FormProvider>
  );
};

TranslationForm.displayName = 'TranslationForm';
