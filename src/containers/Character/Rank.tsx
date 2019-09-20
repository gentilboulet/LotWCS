import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "../../state/actions/header";
import { IStoreState } from "../../state/type";

import { TRank } from "../../data/ranks";

import Rank, { IRankProps } from "../../components/Character/Rank";

interface IMapStateToProps {
  rank: TRank | undefined;
  locked: boolean;
}

interface IMapDispatchToProps {
  onChange: (s: string) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    locked: state.archetype !== undefined,
    rank: state.rank
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>
): IMapDispatchToProps {
  return {
    onChange: (s: string) => dispatch(actions.setRank(Number(s) as TRank))
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): IRankProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Rank);
