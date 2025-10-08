import { DictionaryItemDto } from '../../types';

export type DictionaryItemVO = Pick<DictionaryItemDto, 'id'> & {
  text: React.ReactNode;
  hieroes: React.ReactNode;
  transcription: React.ReactNode;
};
