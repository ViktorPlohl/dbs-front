import { ColorOptionEnum } from './color-option.enum';
import { FormControl } from '@angular/forms';

export type SelectedFilter = {
  searchText: string | null;
  specialTraits: string[] | null;
  colors: ColorOptionEnum[] | null;
  powerList: string[] | null;
  characters: string[] | null;
  series: string[] | null;
  skills: string[] | null;
  cardTypes: string[] | null;
  rarities: string[] | null;
};

export type SelectedFilterForm = {
  searchText: FormControl<string | null | undefined>;
  specialTraits: FormControl<string[] | null | undefined>;
  powerList: FormControl<string[] | null | undefined>;
  colors: FormControl<ColorOptionEnum[] | null | undefined>;
  characters: FormControl<string[] | null | undefined>;
  series: FormControl<string[] | null | undefined>;
  skills: FormControl<string[] | null | undefined>;
  cardTypes: FormControl<string[] | null | undefined>;
  rarities: FormControl<string[] | null | undefined>;
};

export const emptySelectedFilter: SelectedFilter = {
  searchText: '',
  specialTraits: [],
  colors: [],
  powerList: [],
  characters: [],
  series: [],
  skills: [],
  cardTypes: [],
  rarities: [],
};
