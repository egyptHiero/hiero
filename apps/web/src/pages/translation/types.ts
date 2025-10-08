import { SignDto, TranslationDto } from '../../types';

export interface TranslationVO extends TranslationDto {
  signData: SignDto;
}

export interface TranslationJsonLine {
  selected: boolean[][];
}
