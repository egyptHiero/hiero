import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { RosettaBlocksDto } from '../../types';
import {
  CCol,
  CContainer,
  CFormInput,
  CFormRange,
  CFormTextarea,
  CImage,
  CRow,
} from '@coreui/react';
import { Hiero } from '../../components/hiero';
import styled from '@emotion/styled';
import { StyledGrid } from './styled';
import { ImageTabs } from './image-tabs';

const RotatedCImage = styled(CImage)({
  transform: 'scale(-1, 1)',
});

export const RosettaBlockFormControls: React.FC = () => {
  const { t } = useTranslation();
  const { register, watch } = useFormContext<RosettaBlocksDto>();

  const parts = watch('parts');
  const reversedBlocks = React.useMemo(() => [...parts].reverse(), [parts]);

  const [fontSize, setFontSize] = React.useState(40);
  const [imageSize, setImageSize] = React.useState(60);

  return (
    <CContainer className="p-0">
      <CRow>
        <CCol md={6}>
          <CFormInput
            {...register('id', { required: true })}
            label={t('rosetta.parts.name')}
            readOnly
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol md={6}>
          <CFormRange
            min={20}
            max={100}
            value={fontSize}
            onChange={({ target }) =>
              setFontSize(Number.parseInt(target.value))
            }
          />
        </CCol>
        <CCol md={6}>
          <CFormRange
            min={20}
            max={100}
            value={imageSize}
            onChange={({ target }) =>
              setImageSize(Number.parseInt(target.value))
            }
          />
        </CCol>
      </CRow>

      <CCol md={12}>
        <StyledGrid>
          {reversedBlocks.flatMap((part) => [
            <div style={{ gridRow: 1 }} key={`i-${part.image}`}>
              <RotatedCImage src={`rosetta/${part.image}`} height={imageSize} />
            </div>,
            <div style={{ gridRow: 2 }} key={`h-${part.image}`}>
              <Hiero dir="hrl" fontSize={fontSize} text={part.gardinerCodes} />
            </div>,
            <div style={{ gridRow: 3 }} key={`t-${part.image}`}>
              {part.translation}
            </div>,
          ])}
        </StyledGrid>
      </CCol>

      <CRow>
        <CCol xs={12}>
          <CFormTextarea
            {...register('translation')}
            label={t('rosetta.parts.gardinerCodes')}
          />
        </CCol>
      </CRow>

      <ImageTabs />
    </CContainer>
  );
};

RosettaBlockFormControls.displayName = 'RosettaBlockFormControls';
