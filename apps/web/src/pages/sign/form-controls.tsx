import * as React from 'react';
import {
  CCol,
  CFormInput,
  CFormTextarea,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react';
import { Dir } from './dir';
import { FontSize } from './font-size';
import { ShowHieroes } from './show-hieroes';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../types/types';
import { useSignContext } from './context';

type TImagesTab = 'image' | 'css';

export const SignFormControls: React.FC = () => {
  const { t } = useTranslation();
  const { register } = useFormContext<SignDto>();
  const { lines, current } = useSignContext();
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const gardinerCodesRegistration = register('gardinerCodes', {
    required: true,
  });
  const [activeImagesTab, setActiveImagesTab] =
    React.useState<TImagesTab>('image');

  React.useEffect(() => {
    if (current) {
      const [x, y] = current;
      const pos = lines.reduce((acc, line, i) => {
        if (i < x) {
          acc += line.hieroes.join('').length;
          acc += line.delimiters.join('').length + 1;
        } else if (i === x) {
          acc += line.hieroes.slice(0, y).join('').length;
          acc += line.delimiters.slice(0, y + 1).join('').length;
        }

        return acc;
      }, 0);

      const length = lines[x]?.hieroes[y]?.length ?? 2;

      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(pos, pos + length);
    }
  }, [current, lines]);

  return (
    <>
      <CCol md={6}>
        <CFormInput
          {...register('name', { required: true })}
          label={t('sign.name')}
        />
      </CCol>
      <CCol xs={6}>
        <CTabs
          className="w-100"
          defaultActiveItemKey={activeImagesTab}
          onChange={(tab) => setActiveImagesTab(tab as TImagesTab)}
        >
          <CTabList
            variant="enclosed-pills"
            className="d-flex justify-content-between"
          >
            <CTab itemKey="image">{t('sign.image')}</CTab>
            <CTab itemKey="css">{t('sign.css')}</CTab>
          </CTabList>
          <CTabContent className="my-2">
            <CTabPanel itemKey="image">
              <CFormTextarea {...register('image')} required />
            </CTabPanel>
            <CTabPanel itemKey="css">
              <CFormTextarea {...register('imageCss')} required />
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </CCol>
      <CCol xs={6}>
        <CFormTextarea
          rows={4}
          {...register('description')}
          label={t('sign.description')}
        />
      </CCol>
      <CCol xs={6}>
        <CFormTextarea
          rows={4}
          {...gardinerCodesRegistration}
          label={t('sign.gardinerCodes')}
          ref={(el) => {
            gardinerCodesRegistration.ref(el);
            textareaRef.current = el;
          }}
        />
      </CCol>
      {!!lines.length && (
        <CCol md={6}>
          <div className="d-flex gap-2 align-items-center">
            <Dir />
            <FontSize />
          </div>
        </CCol>
      )}
      <CCol md={12}>
        <ShowHieroes />
      </CCol>
    </>
  );
};

SignFormControls.displayName = 'SignFormControls';
