import { ColorOptionEnum } from './color-option.enum';

export type FilterOptions = {
  specialTraits: string[];
  colors: ColorOptionEnum[];
  powerList: string[];
  characterList: string[];
  seriesList: string[];
  skillList: string[];
  cardTypeList: string[];
};
