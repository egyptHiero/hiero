import styled from '@emotion/styled';

export const StyledGrid = styled.div({
  display: 'grid',
  justifyContent: 'start',
  justifyItems: 'center',
  overflowY: 'auto',
  gap: 2,
  '& > *': {
    padding: 5,
    border: '1px solid #ccc',
    textAlign: 'center',
  },
});
