import styled from '@emotion/styled';
import {
  compose,
  flexbox,
  FlexboxProps,
  gridGap,
  GridGapProps,
  height,
  HeightProps,
  maxWidth,
  MaxWidthProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  top,
  TopProps,
  width,
  WidthProps,
} from 'styled-system';
import * as React from 'react';

const Box = styled.div<
  HeightProps &
    MaxWidthProps &
    SpaceProps &
    TextAlignProps &
    TopProps &
    WidthProps
>(
  { position: 'relative' },
  compose(height, space, textAlign, top, width, maxWidth)
);

const FullHeightContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
  ...rest
}) => (
  <div {...rest}>
    <div>{children}</div>
  </div>
);
const FullHeightScroller = styled(FullHeightContainer)<SpaceProps>(
  {
    position: 'relative',
    height: '100%',
    '& > div': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflowY: 'auto',
    },
  },
  space
);

const Flex = styled.div<FlexboxProps | GridGapProps>(
  ({
    display: 'flex',
  }),
  compose(flexbox, gridGap)
);

export const Container = {
  Box,
  FullHeightScroller,
  Flex,
};
