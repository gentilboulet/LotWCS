import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { getCostKungFuTechnique, ICost } from "../../state/costs";

import * as actions from "../../state/actions/kungfu";
import {
  canBuyKungFuTechnique,
  isStyleTechniquePresent
} from "../../state/kungfu";
import { IStoreState } from "../../state/type";

import ExternalKungFuTechnique, {
  IExternalKungFuTechniqueProps
} from "../../components/Character/ExternalKungFuTechnique";
import { KUNGFU_EXTERNAL } from "../../data/kungfu/types";

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
      state.kungfu,
      KUNGFU_EXTERNAL,
      props.styleUid,
      props.uid
    ),
    cost: getCostKungFuTechnique(
      state,
      KUNGFU_EXTERNAL,
      props.styleUid,
      props.uid
    ),
    known: isStyleTechniquePresent(
      state.kungfu,
      KUNGFU_EXTERNAL,
      props.styleUid,
      props.uid
    ),
    styleUid: props.styleUid,
    uid: props.uid
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>,
  props: IProps
): IMapDispatchToProps {
  return {
    onBuy: (cost: ICost) =>
      dispatch(
        actions.buyTechnique(props.styleUid, props.uid, KUNGFU_EXTERNAL, cost)
      )
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): IExternalKungFuTechniqueProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ExternalKungFuTechnique);
