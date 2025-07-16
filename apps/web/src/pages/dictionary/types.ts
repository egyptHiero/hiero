import {DictionaryItemDto} from "../../types/types";

export type DictionaryItemVO  = Pick<DictionaryItemDto, 'id'> & {
  text: React.ReactNode
}
