import styled from '@emotion/styled';

interface StyledMarkProps {
  value: number;
  width?: number;
}

export const StyledMark = styled.div<StyledMarkProps>(({ value, width }) => {
  return {
    position: 'absolute',
    borderRight: '1px solid gray',
    left: 0,
    top: 0,
    width: `calc(${width}%)`,
    height: '18px',
    zIndex: -1,
    '&::after': {
      right: 0,
      position: 'absolute',
      content: `"${value}"`,
      top: '14px',
      fontSize: 'small',
      transform: 'translateX(50%)',
    },
  };
});

export const StyledContainer = styled.div({
  margin: '0 8px',
  position: 'relative',
  top: '-28px',
});

export const StyledScale = styled.div({
  position: 'absolute',
  top: '3px',
  left: 0,
  width: '100%',
  height: '12px',
  zIndex: -1,
  backgroundRepeat: 'no-repeat',
  backgroundSize: Array(4).fill('1px 30px').join(','),
  backgroundPosition: '20% center, 40% center, 60% center, 80% center',
  backgroundImage: Array(4).fill('linear-gradient(gray, gray)').join(','),
});
