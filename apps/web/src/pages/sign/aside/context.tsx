import React, { useState } from 'react';
import {
  TActiveTab,
  TChangeHiero,
  TInsertMode,
  TSignHistory,
  TSignHistoryItems,
} from './types';
import { GARDINER_CLASSIFICATION } from '../../../constants';
import { useSignContext } from '../context';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../../types/types';
import { joinLines } from '../logic';

interface IAsideContext {
  activeTab: TActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<TActiveTab>>;
  classification: string;
  setClassification: React.Dispatch<React.SetStateAction<string>>;
  query?: string;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  history: TSignHistory;
  insertMode?: TInsertMode;
  setInsertMode: React.Dispatch<React.SetStateAction<TInsertMode | undefined>>;
  changeHiero: TChangeHiero;
}

const AsideContext = React.createContext<IAsideContext | null>(null);

export const useSignAsideContext = (): IAsideContext => {
  const context = React.useContext(AsideContext);

  if (context) {
    return context;
  }

  throw new Error('AsideContext was not initialized');
};

interface IAsideContextProvider {
  children?: React.ReactNode;
}

export const AsideContextProvider: React.FC<IAsideContextProvider> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<TActiveTab>('select');
  const [query, setQuery] = useState<string>();
  const [classification, setClassification] = React.useState<string>(
    GARDINER_CLASSIFICATION[0],
  );
  const { lines, current, setCurrent } = useSignContext();
  const { setValue } = useFormContext<SignDto>();

  const [historyItems, setHistoryItems] = React.useState<TSignHistoryItems>({
    undo: [],
    redo: [],
  });

  const history = React.useMemo<TSignHistory>(
    () => ({
      canUndo: !!historyItems.undo.length,
      canRedo: !!historyItems.redo.length,
      save: (item) => {
        setHistoryItems((oldValue) => {
          const undo = [...oldValue.undo];
          undo.push(item);

          return { undo, redo: [] };
        });
      },
      undo: () => {
        setHistoryItems((oldValue) => {
          const undo = [...oldValue.undo];
          const redo = [...oldValue.redo];
          const item = undo.pop();
          redo.push({ current, hieroes: joinLines(lines) });

          if (item) {
            queueMicrotask(() => {
              setValue('classification', item.hieroes);
              setCurrent(item.current);
            });
          }

          return { undo, redo };
        });
      },
      redo: () => {
        setHistoryItems((oldValue) => {
          const undo = [...oldValue.undo];
          const redo = [...oldValue.redo];
          const item = redo.pop();
          undo.push({ current, hieroes: joinLines(lines) });

          if (item) {
            queueMicrotask(() => {
              setValue('classification', item.hieroes);
              setCurrent(item.current);
            });
          }

          return { undo, redo };
        });
      },
    }),
    [
      current,
      historyItems.redo,
      historyItems.undo,
      lines,
      setCurrent,
      setValue,
    ],
  );

  const changeHiero = React.useCallback<TChangeHiero>(
    (value, variant) => {
      history.save({ current, hieroes: joinLines(lines) });
      setValue(
        'classification',
        joinLines(lines, current, { hiero: value, variant }),
      );
    },
    [current, history, lines, setValue],
  );

  const [insertMode, setInsertMode] = React.useState<TInsertMode | undefined>(
    'right',
  );

  const value = React.useMemo(() => {
    return {
      activeTab,
      setActiveTab,
      query,
      setQuery,
      classification,
      setClassification,
      history,
      changeHiero,
      insertMode,
      setInsertMode,
    };
  }, [activeTab, changeHiero, classification, history, insertMode, query]);

  return (
    <AsideContext.Provider value={value}>{children}</AsideContext.Provider>
  );
};

AsideContext.displayName = 'AsideContext';
