import { createAction } from "typesafe-actions";
import * as dataArchetypes from "../../../data/archetypes";
import * as dataRanks from "../../../data/ranks";
import { IPerk } from "../../../perks";
import { historyMetaCreator } from "../meta";

export const setName = createAction(
  "header/SET_NAME",
  (name: string) => {
    return { name };
  },
  historyMetaCreator,
)();

export const setConcept = createAction(
  "header/SET_CONCEPT",
  (concept: string) => {
    return { concept };
  },
  historyMetaCreator,
)();

export const setArchetype = createAction(
  "header/SET_ARCHETYPE",
  (archetype: dataArchetypes.TArchetype) => {
    dataArchetypes.validateArchetype(archetype);
    return { archetype };
  },
  historyMetaCreator,
)();

export const setRank = createAction(
  "header/SET_RANK",
  (rank: dataRanks.TRank) => {
    dataRanks.validateRank(rank);
    const dr = dataRanks.getRank(rank) as dataRanks.IDataRank;
    return { rank, perks: dr.perks as IPerk[] };
  },
  historyMetaCreator,
)();
