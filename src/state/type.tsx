import { THistoryState } from "./history";

import { TChiState } from "./chi";
import { TDiscountsState } from "./discounts";
import { IKungFuState } from "./kungfu";
import { ILoresheetsState } from "./loresheets";
import { TSkillsState } from "./skills";
import { TVirtuesState } from "./virtues";

export interface IStoreState {
  name: string | undefined;
  concept: string | undefined;
  archetype: string | undefined;
  rank: { name: string; value: number } | undefined;

  entanglement: number;
  destiny: number;

  history: THistoryState;

  chi: TChiState;
  kungfu: IKungFuState;
  loresheets: ILoresheetsState;
  skills: TSkillsState;
  virtues: TVirtuesState;

  discounts: TDiscountsState;
}
