import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DbsCard } from '../../types/card.interface';
import * as _ from 'lodash';
import { CardService } from '@shared/card.service';
import { ColorOptionEnum } from '../../types/color-option.enum';
import { BreakepointService } from '@shared/breakepoint.service';
import { SelectedFilter } from '../../types/selected-filter.type';
import { FilterOptions } from '../../types/filter-options.type';
import { CardTypeEnum } from '../../types/card-type.enum';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public selectedFilters$ = new BehaviorSubject<Partial<SelectedFilter>>({
    searchText: '',
    specialTraits: [],
    colors: [],
    powerList: [],
    characters: [],
    series: [],
    skills: [],
    cardTypes: [],
  });
  public filterOptions$ = new BehaviorSubject<FilterOptions>({
    specialTraits: [],
    colors: [],
    powerList: [],
    characterList: [],
    seriesList: [],
    skillList: [],
    cardTypeList: [],
  });
  public filteredCards$ = new BehaviorSubject<DbsCard[][]>([]);

  public filteredCardsCount$ = new BehaviorSubject<number>(0);

  public rowSize$ = new BehaviorSubject<number>(6);

  constructor(private cardsService: CardService, private breakpointService: BreakepointService) {
    cardsService.cards$.subscribe((cards) => {
      this.setCardTypeList();
      this.setSeriesList(cards);
      this.setSpecialTraitList(cards);
      this.setColorList();
      this.setPowerList(cards);
      this.setCharacterList(cards);
      this.setSkillList(cards);
    });

    breakpointService.breakpoint$.subscribe((breakpoint) => {
      if (breakpoint.HandsetLandscape) {
        this.rowSize$.next(4);
      } else if (breakpoint.HandsetPortrait) {
        this.rowSize$.next(2);
      } else if (breakpoint.TabletPortrait || breakpoint.TabletLandscape) {
        this.rowSize$.next(4);
      } else {
        this.rowSize$.next(6);
      }
      this.filter();
    });
  }

  public filter() {
    const filters = this.selectedFilters$.value;
    let filteredCards: DbsCard[] = this.cardsService.cards$.value;
    if (filters.searchText!.length > 0) {
      filteredCards = this.filterByText(filteredCards, filters.searchText?.toLowerCase());
    }
    if (filters.cardTypes!.length > 0) {
      filteredCards = this.filterByCardType(filteredCards, filters.cardTypes);
    }
    if (filters.specialTraits!.length > 0) {
      filteredCards = this.filterBySpecialTraits(filteredCards, filters.specialTraits);
    }
    if (filters.colors!.length > 0) {
      filteredCards = this.filterByColors(filteredCards, filters.colors);
    }
    if (filters.powerList!.length > 0) {
      filteredCards = this.filterByPower(filteredCards, filters.powerList);
    }
    if (filters.characters!.length > 0) {
      filteredCards = this.filterByCharacter(filteredCards, filters.characters);
    }
    if (filters.series!.length > 0) {
      filteredCards = this.filterBySeries(filteredCards, filters.series);
    }
    if (filters.skills!.length > 0) {
      filteredCards = this.filterBySkills(filteredCards, filters.skills);
    }
    this.updateCardList(filteredCards);
  }

  public setSpecialTraitList(cards: DbsCard[]): void {
    const cardsWithSpecialTrait: DbsCard[] = cards.filter((card) => card.hasOwnProperty('specialTrait'));
    const specialTraitArrayOfArrays: string[][] = cardsWithSpecialTrait.map((card) => {
      return card.hasOwnProperty('specialTrait') ? (card['specialTrait'] as string[]) : [];
    });

    this.filterOptions$.next({
      ...this.filterOptions$.value,
      specialTraits: _.orderBy(_.uniq(_.flattenDeep(specialTraitArrayOfArrays))),
    });
  }

  public setCardTypeList(): void {
    this.filterOptions$.next({
      ...this.filterOptions$.value,
      cardTypeList: Object.values(CardTypeEnum),
    });
  }

  public setColorList(): void {
    this.filterOptions$.next({
      ...this.filterOptions$.value,
      colors: Object.values(ColorOptionEnum),
    });
  }

  public setPowerList(cards: DbsCard[]): void {
    const powers: string[] = [...new Set(_.compact(cards.map((item) => item['power'])))];

    this.filterOptions$.next({
      ...this.filterOptions$.value,
      powerList: _.orderBy(powers, (power) => _.toNumber(power), 'desc'),
    });
  }

  private setCharacterList(cards: DbsCard[]): void {
    const characters: string[] = [...new Set(_.compact(cards.map((item) => item['character'])))];
    this.filterOptions$.next({
      ...this.filterOptions$.value,
      characterList: _.orderBy(characters),
    });
  }

  private setSeriesList(cards: DbsCard[]): void {
    const series: string[] = [...new Set(_.compact(cards.map((item) => item.series)))];
    this.filterOptions$.next({
      ...this.filterOptions$.value,
      seriesList: _.orderBy(series),
    });
  }

  private setSkillList(cards: DbsCard[]): void {
    const skills: string[] = _.orderBy(_.uniq(_.flattenDeep(cards.map((card) => card.skill.keywords))));
    this.filterOptions$.next({
      ...this.filterOptions$.value,
      skillList: _.orderBy(skills),
    });
  }

  private filterByText(cards: DbsCard[], searchText: string | null | undefined): DbsCard[] {
    return cards.filter(
      (card) =>
        FilterService.findNumber(card, searchText) ||
        FilterService.findName(card, searchText) ||
        FilterService.findEra(card, searchText) ||
        FilterService.findSeries(card, searchText)
    );
  }

  private static findNumber(card: DbsCard, value: string | null | undefined): boolean {
    return value ? card.number?.toLowerCase().search(value) !== -1 : true;
  }

  private static findName(card: DbsCard, value: string | null | undefined): boolean {
    return value ? card.name?.toLowerCase().search(value) !== -1 : true;
  }

  private static findEra(card: DbsCard, value: string | null | undefined): boolean {
    return value && card.era ? card.era?.toLowerCase().search(value) !== -1 : false;
  }

  private static findSeries(card: DbsCard, value: string | null | undefined): boolean {
    return value && card.series ? card.series?.toLowerCase().search(value) !== -1 : false;
  }

  private filterBySpecialTraits(cards: DbsCard[], specialTraits: string[] | null | undefined): DbsCard[] {
    return cards.filter((card) => {
      if (card['specialTrait'] !== undefined && specialTraits) {
        return specialTraits.some((specialTrait) => card['specialTrait'].includes(specialTrait));
      } else {
        return false;
      }
    });
  }

  private filterByColors(cards: DbsCard[], colors: ColorOptionEnum[] | null | undefined): DbsCard[] {
    return colors
      ? cards.filter((card) => {
          const cardColor = card.color.join('_').toUpperCase();
          return colors.some((color) => color === cardColor);
        })
      : cards;
  }

  private filterByPower(cards: DbsCard[], powerList: string[] | null | undefined): DbsCard[] {
    return cards.filter((card) => {
      if (card['power'] !== undefined && powerList) {
        return powerList.some((power) => card['power'] === power);
      } else {
        return false;
      }
    });
  }

  private filterByCharacter(cards: DbsCard[], characterList: string[] | null | undefined): DbsCard[] {
    return cards.filter((card) => {
      if (card['character'] !== undefined && characterList) {
        return characterList.some((character) => card['character'] === character);
      } else {
        return false;
      }
    });
  }

  private filterBySeries(cards: DbsCard[], seriesList: string[] | null | undefined): DbsCard[] {
    return cards.filter((card) => {
      if (card.series !== undefined && seriesList) {
        return seriesList.some((series) => card.series === series);
      } else {
        return false;
      }
    });
  }

  private filterByCardType(cards: DbsCard[], cardTypeList: string[] | null | undefined): DbsCard[] {
    return cards.filter((card) => {
      if (card.type !== undefined && cardTypeList) {
        return cardTypeList.some((cardType) => card.type === cardType);
      } else {
        return false;
      }
    });
  }

  private filterBySkills(cards: DbsCard[], skills: string[] | null | undefined): DbsCard[] {
    return cards.filter((card) => {
      if (card.skill.keywords !== undefined && skills) {
        return skills.some((skill) => card.skill.keywords.includes(skill));
      } else {
        return false;
      }
    });
  }

  private createChunks(cards: DbsCard[]) {
    this.filteredCards$.next(_.chunk(cards, this.rowSize$.value));
  }

  private updateCardList(cards: DbsCard[]): void {
    this.filteredCardsCount$.next(cards.length);
    this.createChunks(cards);
  }
}
