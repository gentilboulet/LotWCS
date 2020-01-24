import { produce } from "immer";

/* eslint-disable import/first */
import { createState as createAutomaticsState } from "./automatics";
import { createState as createChiState } from "./chi";
import { createState as createDiscountsState } from "./discounts";
import { createState as createaKungFuState } from "./kungfu";
import { createState as createLoresheetsState } from "./loresheets";
import { createState as createSkillsState } from "./skills";
import { ICharacterState } from "./type";
import { createState as createVirtuesState } from "./virtues";

import { globalReducer } from "../reducers/global";

export function emptyStateFactory(): ICharacterState {
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

    automatics: createAutomaticsState(),

    destiny: 0,
    entanglement: 0,
    discounts: createDiscountsState(),
  };
}

import _ from "lodash";
import { setArchetype, setRank } from "../actions/header";
import { skillSpecialityBuy } from "../actions/skills";
import { zeroCost } from "./costs";

export function testingStateFactory(): ICharacterState {
  const initial = emptyStateFactory();
  const actions = [
    setRank(2),
    setArchetype("warrior"),
    skillSpecialityBuy("Awareness", "Hear", zeroCost),
    skillSpecialityBuy("Awareness", "Sight", zeroCost),
  ];
  const produced = produce(initial, draft => {
    actions.forEach(action => {
      draft = globalReducer(draft, action);
    });
    return draft;
  });
  return _.cloneDeep(produced); // required for unfreezing the result of produce
}

export function initialStateFactory(): ICharacterState {
  return emptyStateFactory();
}
