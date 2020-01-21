/* eslint-disable import/first */
import { ICharacterState } from "./type";

import { createState as createAutomaticsState } from "./automatics";
import { createState as createChiState } from "./chi";
import { createState as createDiscountsState } from "./discounts";
import { createState as createaKungFuState } from "./kungfu";
import { createState as createLoresheetsState } from "./loresheets";
import { createState as createSkillsState } from "./skills";
import { createState as createVirtuesState } from "./virtues";

export function emptyStateFactory(): ICharacterState {
  return {
    archetype: undefined,
    concept: undefined,
    name: undefined,
    rank: undefined,

    destiny: 0,
    entanglement: 0,

    chi: createChiState(),
    kungfu: createaKungFuState(),
    loresheets: createLoresheetsState(),
    skills: createSkillsState(),
    virtues: createVirtuesState(),

    automatics: createAutomaticsState(),
    discounts: createDiscountsState()
  };
}

// import { setArchetype, setRank } from "../actions/header";
// import { skillSpecialityBuy } from "../actions/skills";
// import { zeroCost } from "./costs";
//
// export function testingStateFactory(): ICharacterState {
//   const initial = emptyStateFactory();
//   const actions = [
//     setRank(2),
//     setArchetype("warrior"),
//     skillSpecialityBuy("Awareness", "Hear", zeroCost),
//     skillSpecialityBuy("Awareness", "Sight", zeroCost)
//   ];
//   return replayHistory(initial, actions);
// }

export function testingStateFactory() {
  return initialStateFactory();
}

export function initialStateFactory(): ICharacterState {
  return emptyStateFactory();
}
