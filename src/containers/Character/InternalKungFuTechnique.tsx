import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import {
  getCostKungFuTechnique,
  ICost,
} from "../../state/models/character/costs";

import { IStoreState } from "../../state";
import * as actions from "../../state/actions/character/kungfu";
import {
  canBuyKungFuTechnique,
  isStyleTechniquePresent,
} from "../../state/models/character/kungfu";

import InternalKungFuTechnique, {
  IInternalKungFuTechniqueProps,
} from "../../components/Character/InternalKungFuTechnique";
import { KUNGFU_INTERNAL } from "../../data/kungfu/types";

interface IMapStateToProps {
  styleUid: string;
  uid: string;
  known: boolean;
  canBuy: boolean;
  cost: ICost;
}

interface IMapDispatchToProps {
  onBuy: (cost: ICost) => void;
}

interface IProps {
  styleUid: string;
  uid: string;
}

function mapStateToProps(state: IStoreState, props: IProps): IMapStateToProps {
  return {
    canBuy: canBuyKungFuTechnique(
      state.character.kungfu,
      KUNGFU_INTERNAL,
      props.styleUid,
      props.uid,
    ),
    cost: getCostKungFuTechnique(
      state.character,
      KUNGFU_INTERNAL,
      props.styleUid,
      props.uid,
    ),
    known: isStyleTechniquePresent(
      state.character.kungfu,
      KUNGFU_INTERNAL,
      props.styleUid,
      props.uid,
    ),
    styleUid: props.styleUid,
    uid: props.uid,
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>,
  props: IProps,
): IMapDispatchToProps {
  return {
    onBuy: (cost: ICost) =>
      dispatch(
        actions.buyTechnique(props.styleUid, props.uid, KUNGFU_INTERNAL, cost),
      ),
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps,
): IInternalKungFuTechniqueProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(InternalKungFuTechnique);
