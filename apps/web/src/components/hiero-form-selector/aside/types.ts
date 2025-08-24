import { TCurrent, THieroChange } from '../types';

export type TActiveTab = 'select' | 'search';

export interface TSelectorHistoryItem {
  hieroes: string;
  current: TCurrent;
}

export interface TSelectorHistory {
  canUndo: boolean;
  canRedo: boolean;
  save: (item: TSelectorHistoryItem) => void;
  undo: () => void;
  redo: () => void;
}

export interface TSelectorHistoryItems {
  undo: TSelectorHistoryItem[];
  redo: TSelectorHistoryItem[];
}

export type TChangeHiero = (
  value: THieroChange['hiero'],
  variant: THieroChange['variant'],
) => void;

export type TInsertMode = 'left' | 'right';
