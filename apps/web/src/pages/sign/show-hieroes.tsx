import React, { ReactEventHandler } from 'react';
import { Hiero } from '../../controls/hiero';
import { CContainer, CImage } from '@coreui/react';
import { useFormContext } from 'react-hook-form';
import { SignDto, TDir } from '../../types';
import styled from '@emotion/styled';
import { Property } from 'csstype';
import { useSignContext } from './context';
import classNames from 'classnames';
import JSON5 from 'json5';

type ImageDirection = 'row' | 'column';

function getFlowDirection(dir?: TDir): Property.FlexDirection {
  switch (dir) {
    case 'hlr':
      return 'column';
    case 'hrl':
      return 'column-reverse';
    case 'vlr':
      return 'row';
    case 'vrl':
      return 'row-reverse';
    default:
      return 'inherit';
  }
}

interface StyledHieroContainerProps {
  $dir?: TDir;
}

const StyledHieroContainer = styled.div<StyledHieroContainerProps>(
  {
    display: 'flex',
    '* > svg > text': {
      cursor: 'pointer',
      ':hover': {
        fill: 'red',
        outline: '1px dashed red',
      },
    },
  },
  ({ $dir }) => ({
    flexDirection: getFlowDirection($dir),
    width: $dir?.startsWith('v') ? 'fit-content' : '100%',
  }),
);

const parseCSS = (cssText?: string) => {
  try {
    if (cssText) {
      return JSON5.parse(cssText);
    }
  } catch (e) {
    console.log('error', e);
  }

  return {};
};

const DynamicStyledDiv: React.FC<
  React.PropsWithChildren<{ cssText?: string }>
> = ({ cssText }) => <>{styled.div(parseCSS(cssText))}</>;

export const ShowHieroes: React.FC = () => {
  const {
    lines,
    current,
    setCurrent,
    setAsideVisible,
    isImageLoaded,
    setImageIsLoaded,
  } = useSignContext();
  const { watch } = useFormContext<SignDto>();
  const dir = watch('dir') as TDir | undefined;
  const fontSize = watch('fontSize') || 40;
  const image = watch('image');
  const cssText = watch('imageCss');

  const handleClick = (lineIndex: number, hieroIndex: number) => {
    setCurrent([lineIndex, hieroIndex]);
    setAsideVisible(true);
  };

  const [imageDirection, setImageDirection] =
    React.useState<ImageDirection>('row');
  const imageLoadHandler = React.useCallback<
    ReactEventHandler<HTMLOrSVGImageElement>
  >(
    ({ target }) => {
      const img = target as HTMLOrSVGImageElement;
      setImageDirection(img.width > img.height ? 'column' : 'row');
      setImageIsLoaded(true);
    },
    [setImageIsLoaded],
  );

  const images = React.useMemo(() => image?.split('\n') || [], [image]);

  return (
    <CContainer
      fluid
      className={classNames(
        'd-flex',
        imageDirection !== 'row' ? 'flex-column' : 'flex-row',
      )}
    >
      <DynamicStyledDiv cssText={cssText}>
        {images.map((img, index) => (
          <div key={`${img}_${index}`}>
            <CImage
              src={img}
              className={classNames({ 'd-none': !isImageLoaded })}
              // todo: support multiply images
              onLoad={imageLoadHandler}
              onError={() => setImageIsLoaded(false)}
            />
          </div>
        ))}
      </DynamicStyledDiv>

      <div className={classNames('text-start', { 'd-none': !lines })}>
        <StyledHieroContainer $dir={dir}>
          {lines.map((line, lineIndex) => (
            <div
              key={line.codes}
              className={classNames('p-1', {
                selected: lineIndex === current?.[0],
              })}
              style={{
                borderRight: '2px solid #ccc',
                borderBottom: '2px solid #ccc',
              }}
            >
              <Hiero
                text={line.codes}
                dir={dir}
                fontSize={fontSize}
                onClick={(hieroIndex: number) =>
                  handleClick(lineIndex, hieroIndex)
                }
                selectedPos={
                  current?.[0] === lineIndex ? current[1] : undefined
                }
              />
            </div>
          ))}
        </StyledHieroContainer>
      </div>
    </CContainer>
  );
};

ShowHieroes.displayName = 'ShowHieroes';
