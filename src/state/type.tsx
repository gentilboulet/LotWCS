import { THistoryState } from "./history";

import { TArchetype } from "../data/archetypes";
import { TRank } from "../data/ranks";
import { TAutomaticsState } from "./automatics";
import { TChiState } from "./chi";
import { TDiscountsState } from "./discounts";
import { IKungFuState } from "./kungfu";
import { ILoresheetsState } from "./loresheets";
import { TSkillsState } from "./skills";
import { TVirtuesState } from "./virtues";

export interface IStoreState {
  name: string | undefined;
  concept: string | undefined;
  archetype: TArchetype | undefined;
  rank: TRank | undefined;

  entanglement: number;
  destiny: number;

  history: THistoryState;

  chi: TChiState;
  kungfu: IKungFuState;
  loresheets: ILoresheetsState;
  skills: TSkillsState;
  virtues: TVirtuesState;

  automatics: TAutomaticsState;
  discounts: TDiscountsState;
}
