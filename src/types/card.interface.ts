import { Skill } from '../../../dbs/src/types/skill.type';
import { Energy } from '../../../dbs/src/types/energy.type';
import { CardTypeEnum } from './card-type.enum';
import { Color } from '../../../dbs/src/types/color';

export interface Card {
  number: string;
  name: string;
  type: CardTypeEnum;
  color: Color[];
  availableInTournaments: string;
  series: string;
  rarity: string;
  image: string;
  skill: Skill;
  era: string;
}

export interface BattleCard extends Card {
  power: string;
  energy: Energy;
  comboEnergy: string;
  comboPower: string;
  character: string;
  specialTrait: string[];
}

export interface LeaderCard extends Card {
  power: string;
  character: string;
  specialTrait: string[];
  cardBack: Partial<LeaderCard>;
}

export interface ExtraCard extends Card {
  energy: Energy;
}

export interface UnisonCard extends Card {
  power: string;
  energy: Energy;
}

export type DbsCard = LeaderCard | ExtraCard | BattleCard | UnisonCard;
