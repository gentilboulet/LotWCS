import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import {
  getCostBuyLoresheetOption,
  ICost
} from "../../state/character/models/costs";

import { IStoreState } from "../../state";
import * as actions from "../../state/character/actions/loresheets";
import {
  canBuyLoresheetOption,
  isLoresheetOptionPresent
} from "../../state/character/models/loresheets";

import LoresheetOption, {
  ILoresheetOptionProps
} from "../../components/Character/LoresheetOption";

interface IMapStateToProps {
  lsUid: string;
  uid: string;
  known: boolean;
  canBuy: boolean;
  cost: ICost[];
  payloads?: any[];
}

interface IMapDispatchToProps {
  onBuy: (cost: ICost) => void;
}

interface IProps {
  lsUid: string;
  uid: string;
}

function mapStateToProps(state: IStoreState, props: IProps): IMapStateToProps {
  const lsState = state.character.loresheets[props.lsUid];
  let payloads;
  if (lsState) {
    const optState = lsState.filter(o => o.uid === props.uid);
    if (optState) {
      const array = optState.map(o => o.payload !== undefined);
      if (array.length > 0) {
        const gotPayload = array.reduce((p, c) => p && c);
        if (gotPayload) {
          payloads = optState.map(o => o.payload);
        }
      }
    }
  }
  return {
    canBuy: canBuyLoresheetOption(
      state.character.loresheets,
      props.lsUid,
      props.uid
    ),
    cost: getCostBuyLoresheetOption(state.character, props.lsUid, props.uid),
    known: isLoresheetOptionPresent(
      state.character.loresheets,
      props.lsUid,
      props.uid
    ),
    lsUid: props.lsUid,
    payloads,
    uid: props.uid
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>,
  props: IProps
): IMapDispatchToProps {
  return {
    onBuy: (cost: ICost, payload?: string) =>
      dispatch(actions.buyOption(props.lsUid, props.uid, cost, payload))
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): ILoresheetOptionProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(LoresheetOption);
