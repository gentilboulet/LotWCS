import { THistoryState } from 'state/history';

import { TChiState } from 'state/chi';
import { IKungFuState } from 'state/kungfu'
import { ILoresheetsState } from 'state/loresheets';;
import { TSkillsState } from 'state/skills';
import { TVirtuesState } from 'state/virtues';

import { TBonusesState } from 'state/bonuses';
import { TDiscountsState } from 'state/discounts';

export interface IStoreState {
  name: string | undefined;
  concept: string | undefined;
  archetype: string | undefined;
  rank: { name: string, value: number } | undefined;

  entanglement: number;
  destiny: number;

  history: THistoryState;

  chi: TChiState ;
  kungfu: IKungFuState;
  loresheets: ILoresheetsState;
  skills: TSkillsState;
  virtues: TVirtuesState;

  bonuses: TBonusesState;
  discounts : TDiscountsState;
}
