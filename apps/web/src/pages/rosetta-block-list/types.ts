import { RosettaBlocksDto } from '../../types';

export type ColumnNames = keyof Pick<RosettaBlocksDto, 'id' | 'translation'>;
