import styled from '@emotion/styled';
import { CCol } from '@coreui/react';

export const StyledTranslation = styled.span({
  fontWeight: 'bolder',
});

export const StyledDescription = styled.span({
  paddingLeft: 4,
  fontSize: 'small',
  fontStyle: 'italic',
});

export const StyledTranscription = styled.span({
  fontStyle: 'italic',
});

export const StyledInterpretation = styled.span({
  fontWeight: 'bolder',
  paddingLeft: 4,
});

export const StyledCCol = styled(CCol)({
  '& >.form-label': {
    marginBottom: 0,
  },
  marginBottom: '1rem',
});
