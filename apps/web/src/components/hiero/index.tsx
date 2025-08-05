import React, { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import syntax from './hierojax.js';
import { toUnicode } from './hieroes';
import styled from '@emotion/styled';

interface StyledDivProps {
  selectedPos?: number;
}

const StyledDiv = styled.div<StyledDivProps>(
  ({ selectedPos = Number.NEGATIVE_INFINITY }) => ({
    [`& > svg > .hierojax-svg-sign:nth-of-type(${selectedPos >= 0 ? selectedPos + 1 : undefined})`]:
      {
        fill: 'green',
        outline: '1px dashed green',
      },
  }),
);

interface IHieroProps {
  text?: string;
  color?: string;
  fontSize?: number;
  dir?: 'hlr' | 'hrl' | 'vlr' | 'vrl';
  sep?: number;
  key?: string;
  onClick?: (hieroIndex: number) => void;
  selectedPos?: number;
}

export const Hiero: React.FC<IHieroProps> = ({
  text = '',
  color,
  fontSize,
  dir,
  key,
  onClick,
  selectedPos,
  sep = 0.25,
}) => {
  const { t } = useTranslation();

  const hieroHTML = React.useMemo<string>(() => {
    try {
      const fragment = syntax.parse(toUnicode(text).join(''));
      const parent = document.createElement('span');
      fragment.print(parent, {
        fontsize: fontSize,
        sep,
        dir,
        signcolor: color,
        log: 'false',
      });

      const svg = parent.firstChild as HTMLElement;

      // Clean up everything but .hierojax-svg-sign elements for exact numeration. That's true - it smells.
      if (svg) {
        const elementsToKeep = svg.querySelectorAll('.hierojax-svg-sign');

        svg.innerHTML = Array.from(elementsToKeep)
          .map((el) => el.outerHTML)
          .join('');
      }

      return parent.innerHTML;
    } catch {
      return t('parse.error');
    }
  }, [text, fontSize, sep, dir, color, t]);

  const handleClick: MouseEventHandler<HTMLDivElement> = ({ target }) => {
    if (target instanceof SVGTextElement) {
      const svg = target.closest('svg');
      if (svg) {
        onClick?.(
          Array.from(svg.querySelectorAll('text.hierojax-svg-sign')).indexOf(
            target,
          ),
        );
      }
    }
  };

  return (
    <StyledDiv
      key={key}
      dangerouslySetInnerHTML={{ __html: hieroHTML }}
      onClick={handleClick}
      selectedPos={selectedPos}
    />
  );
};

Hiero.displayName = 'Hiero';
