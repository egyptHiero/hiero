import * as React from 'react';
import { CCol, CFormInput, CFormTextarea } from '@coreui/react';
import { Dir } from './dir';
import { FontSize } from './font-size';
import { ShowHieroes } from './show-hieroes';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../types/types';
import { useSignContext } from './context';

export const SignFormControls: React.FC = () => {
  const { t } = useTranslation();
  const { register } = useFormContext<SignDto>();
  const { lines, current } = useSignContext();
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const gardinerCodesRegistration = register('gardinerCodes', {
    required: true,
  });

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
        <CFormInput {...register('image')} label={t('sign.image')} required />
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
