import React, { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import syntax from './hierojax.js';
import { toUnicode } from './hieroes';

interface IHieroProps {
  text: string;
  fontSize?: number;
  dir?: 'hlr' | 'hrl' | 'vlr' | 'vrl';
  key?: string;
  onClick?: (hieroIndex: number, imageIndex: number) => void;
}

export const Hiero: React.FC<IHieroProps> = ({
  text,
  fontSize,
  dir,
  key,
  onClick,
}) => {
  const { t } = useTranslation();

  const hieroHTML = React.useMemo<string>(() => {
    try {
      const fragment = syntax.parse(toUnicode(text).join(''));
      const parent = document.createElement('span');
      fragment.print(parent, {
        fontsize: fontSize,
        sep: 0.25,
        dir: dir,
      });

      return parent.innerHTML;
    } catch {
      return t('parse.error');
    }
  }, [text, fontSize, dir, t]);

  const handleClick: MouseEventHandler<HTMLDivElement> = ({ target }) => {
    if (!(target instanceof SVGTextElement)) return;
    const svg = target.closest('svg');
    if (svg) {
      onClick?.(
        Array.from(svg.querySelectorAll('text.hierojax-svg-sign')).indexOf(
          target,
        ),
        Array.from(svg.querySelectorAll('text')).indexOf(target),
      );
    }
  };

  return (
    <div
      key={key}
      dangerouslySetInnerHTML={{ __html: hieroHTML }}
      onClick={handleClick}
    />
  );
};

Hiero.displayName = 'Hiero';
