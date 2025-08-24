import React, { useState } from 'react';
import {
  TActiveTab,
  TChangeHiero,
  TInsertMode,
  TSelectorHistory,
  TSelectorHistoryItems,
} from './types';
import { joinLines } from '../logic';
import { useHieroSelectorContext } from '../context';

interface IAsideContext {
  activeTab: TActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<TActiveTab>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  query?: string;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  history: TSelectorHistory;
  insertMode?: TInsertMode;
  setInsertMode: React.Dispatch<React.SetStateAction<TInsertMode | undefined>>;
  changeHiero: TChangeHiero;
}

const AsideContext = React.createContext<IAsideContext | null>(null);

export const useSelectorAsideContext = (): IAsideContext => {
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
  const [category, setCategory] = useState('A');
  const { lines, current, setCurrent, setGardinerCodes } =
    useHieroSelectorContext();

  const [historyItems, setHistoryItems] = React.useState<TSelectorHistoryItems>(
    {
      undo: [],
      redo: [],
    },
  );

  const history = React.useMemo<TSelectorHistory>(
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
              setGardinerCodes(item.hieroes);
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
              setGardinerCodes(item.hieroes);
              setCurrent(item.current);
            });
          }

          return { undo, redo };
        });
      },
    }),
    [
      current,
      historyItems.redo.length,
      historyItems.undo.length,
      lines,
      setCurrent,
      setGardinerCodes,
    ],
  );

  const changeHiero = React.useCallback<TChangeHiero>(
    (value, variant) => {
      history.save({ current, hieroes: joinLines(lines) });
      setGardinerCodes(joinLines(lines, current, { hiero: value, variant }));
    },
    [current, history, lines, setGardinerCodes],
  );

  const [insertMode, setInsertMode] = React.useState<TInsertMode | undefined>(
    'right',
  );

  const value = React.useMemo<IAsideContext>(
    () => ({
      activeTab,
      setActiveTab,
      category,
      setCategory,
      query,
      setQuery,
      history,
      changeHiero,
      insertMode,
      setInsertMode,
    }),
    [activeTab, category, changeHiero, history, insertMode, query],
  );

  return (
    <AsideContext.Provider value={value}>{children}</AsideContext.Provider>
  );
};

AsideContext.displayName = 'AsideContext';
