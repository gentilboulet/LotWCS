import * as data from "../../../data/ranks";
import { ICharacterState } from "./type";

export function setRank(state: ICharacterState, rank: data.TRank): void {
  const dataRank = data.getRank(rank) as data.IDataRank;
  state.rank = dataRank.value;
}
