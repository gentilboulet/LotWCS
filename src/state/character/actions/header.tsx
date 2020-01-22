import { createAction } from "typesafe-actions";

import * as dataArchetypes from "../../../data/archetypes";
import * as dataRanks from "../../../data/ranks";

export const setName = createAction("header/SET_NAME", (name: string) => {
  return { name };
})();

export const setConcept = createAction(
  "header/SET_CONCEPT",
  (concept: string) => {
    return { concept };
  },
)();

export const setArchetype = createAction(
  "header/SET_ARCHETYPE",
  (archetype: dataArchetypes.TArchetype) => {
    dataArchetypes.validateArchetype(archetype);
    return { archetype };
  },
)();

export const setRank = createAction(
  "header/SET_RANK",
  (rank: dataRanks.TRank) => {
    dataRanks.validateRank(rank);
    return { rank };
  },
)();
