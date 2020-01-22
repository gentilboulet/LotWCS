import { createAction } from "typesafe-actions";

import * as dataArchetypes from "../../../data/archetypes";
import * as dataRanks from "../../../data/ranks";

export const setName = createAction(
  "header/SET_NAME",
  action => (name: string) => {
    return action({ name });
  },
);

export const setConcept = createAction(
  "header/SET_CONCEPT",
  action => (concept: string) => {
    return action({ concept });
  },
);

export const setArchetype = createAction(
  "header/SET_ARCHETYPE",
  action => (archetype: dataArchetypes.TArchetype) => {
    dataArchetypes.validateArchetype(archetype);
    return action({ archetype });
  },
);

export const setRank = createAction(
  "header/SET_RANK",
  action => (rank: dataRanks.TRank) => {
    dataRanks.validateRank(rank);
    return action({ rank });
  },
);
