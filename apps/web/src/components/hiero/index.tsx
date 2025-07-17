import * as React from 'react';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import syntax from './hierojax.js';
import { toUnicode } from './hieroes';

interface IHieroProps {
  text: string;
  fontSize?: number;
  dir?: string;
  key?: string;
}

export const Hiero: React.FC<IHieroProps> = ({ text, fontSize, dir, key }) => {
  const { t } = useTranslation();

  const hieroHTML = React.useMemo<string>(() => {
    try {
      const fragment = syntax.parse(toUnicode(text).join(''));
      const parent = document.createElement('span');
      fragment.print(parent, {
        fontsize: fontSize,
        log: 'false',
        sep: 0.25,
        border: 'false',
        dir: dir,
      });

      return parent.innerHTML;
    } catch (e) {
      return t('parse.error');
    }
  }, [text, fontSize, dir, t]);

  return <div key={key} dangerouslySetInnerHTML={{ __html: hieroHTML }} />;
};

Hiero.displayName = 'Hiero';
