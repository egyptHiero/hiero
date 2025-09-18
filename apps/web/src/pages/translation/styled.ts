import styled from '@emotion/styled';
import { CButton } from '@coreui/react';

export const StyledTranslationsGrid = styled.div<{
  $hieroesCount: number;
  $dictionariesCount: number;
}>(({ $hieroesCount, $dictionariesCount }) => ({
  display: 'grid',
  gridAutoRows: '4em',
  gridTemplateColumns: `repeat(${$hieroesCount}, 4.5em) auto repeat(${$dictionariesCount}, auto) auto 20%`,
  gridTemplateRows: '2em',
  gridAutoFlow: 'column dense',
  gap: 4,
  width: '100%',
}));

export const StyledTranslationsGridHeader = styled.div<{ $position: number }>(
  ({ $position }) => ({
    gridRow: 1,
    gridColumn: $position,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
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
