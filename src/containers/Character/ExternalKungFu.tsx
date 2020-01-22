import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { IStoreState } from "../../state";
import * as actions from "../../state/character/actions/kungfu";
import { getCostKungFuStyle, ICost } from "../../state/character/models/costs";
import {
  canOpenKungFu,
  getExternalKungFuStatistics,
  isStylePresent
} from "../../state/character/models/kungfu";

import ExternalKungFu, {
  IExternalKungFuProps
} from "../../components/Character/ExternalKungFu";

import {
  IDataExternalKungfuStatistics,
  KUNGFU_EXTERNAL
} from "../../data/kungfu/types";

interface IProps {
  uid: string;
}

interface IMapStateToProps {
  canOpen: boolean;
  isOpen: boolean;
  knownTechniques: string[];
  uid: string;
  cost: ICost;
  statistics: IDataExternalKungfuStatistics;
}

interface IMapDispatchToProps {
  onOpen: (cost: ICost) => void;
}

function mapStateToProps(state: IStoreState, props: IProps): IMapStateToProps {
  const isOpen = isStylePresent(
    state.character.kungfu,
    KUNGFU_EXTERNAL,
    props.uid
  );

  return {
    canOpen: canOpenKungFu(state.character.kungfu, KUNGFU_EXTERNAL, props.uid),
    cost: getCostKungFuStyle(state.character, KUNGFU_EXTERNAL, props.uid),
    isOpen,
    knownTechniques: isOpen
      ? state.character.kungfu[KUNGFU_EXTERNAL][props.uid]
      : [],
    statistics: getExternalKungFuStatistics(state.character.kungfu, props.uid),
    uid: props.uid
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>,
  props: IProps
): IMapDispatchToProps {
  return {
    onOpen: (cost: ICost) =>
      dispatch(actions.openStyle(props.uid, KUNGFU_EXTERNAL, cost))
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): IExternalKungFuProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ExternalKungFu);
