import styled from '@emotion/styled';
import { CButton } from '@coreui/react';

export const StyledTranslationsGrid = styled.div<{ $size: number }>(
  ({ $size }) => ({
    display: 'grid',
    gridAutoRows: '4em',
    gridTemplateColumns: `repeat(${$size}, 4.5em) auto 2fr 1fr`,
    gridAutoFlow: 'column dense',
    gap: 4,
    width: '100%',
  }),
);

export const StyledCButton = styled(CButton)<{
  $firstRow: number;
  $size: number;
}>(({ $firstRow, $size }) => ({
  gridRow: `${$firstRow} / ${$size} span`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
}));
