import { TCurrent } from '../types';

export type TActiveTab = 'select' | 'search';

export interface TSignHistoryItem {
  hieroes: string;
  current?: TCurrent;
}

export interface TSignHistory {
  canUndo: boolean;
  canRedo: boolean;
  save: (item: TSignHistoryItem) => void;
  undo: () => void;
  redo: () => void;
}

export interface TSignHistoryItems {
  undo: TSignHistoryItem[];
  redo: TSignHistoryItem[];
}

export type TChangeHiero = (
  value: string,
  variant: 'left' | 'right' | 'hiero',
) => void;
