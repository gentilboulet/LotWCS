/* eslint-disable import/first */
import { TArchetype } from "../../../data/archetypes";
import { TRank } from "../../../data/ranks";
import { TGearState } from "../../gear";
import { TAutomaticsState } from "./automatics";
import { TChiState } from "./chi";
import { TDiscountsState } from "./discounts";
import { IKungFuState } from "./kungfu";
import { ILoresheetsState } from "./loresheets";
import { TSkillsState } from "./skills";
import { TVirtuesState } from "./virtues";

export interface ICharacterState {
  name: string | undefined;
  concept: string | undefined;
  archetype: TArchetype | undefined;
  rank: TRank | undefined;

  entanglement: number;
  destiny: number;

  chi: TChiState;
  kungfu: IKungFuState;
  loresheets: ILoresheetsState;
  skills: TSkillsState;
  virtues: TVirtuesState;
  gear: TGearState;

  automatics: TAutomaticsState;
  discounts: TDiscountsState;
}

import { createState as createGearState } from "./../../gear";
import { createState as createAutomaticsState } from "./automatics";
import { createState as createChiState } from "./chi";
import { createState as createDiscountsState } from "./discounts";
import { createState as createaKungFuState } from "./kungfu";
import { createState as createLoresheetsState } from "./loresheets";
import { createState as createSkillsState } from "./skills";
import { createState as createVirtuesState } from "./virtues";

export function initialStateFactory(): ICharacterState {
  return {
    archetype: undefined,
    concept: undefined,
    name: undefined,
    rank: undefined,

    chi: createChiState(),
    kungfu: createaKungFuState(),
    loresheets: createLoresheetsState(),
    skills: createSkillsState(),
    virtues: createVirtuesState(),
    gear: createGearState(),

    automatics: createAutomaticsState(),

    destiny: 0,
    entanglement: 0,
    discounts: createDiscountsState(),
  };
}
