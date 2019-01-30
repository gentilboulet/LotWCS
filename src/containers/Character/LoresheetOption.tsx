import { connect } from "react-redux";
import { Dispatch } from "redux";

import { getCostBuyLoresheetOption, ICost } from "../../state/costs";

import { buyOption, ILoresheetAction } from "../../state/actions/loresheets";
import {
  canBuyLoresheetOption,
  isLoresheetOptionPresent
} from "../../state/loresheets";
import { IStoreState } from "../../state/type";

import LoresheetOption, {
  ILoresheetOptionProps
} from "../../components/Character/LoresheetOption";

interface IMapStateToProps {
  lsUid: string;
  uid: string;
  known: boolean;
  canBuy: boolean;
  cost: ICost[];
  payloads: any[];
}

interface IMapDispatchToProps {
  onBuy: (cost: ICost) => void;
}

interface IProps {
  lsUid: string;
  uid: string;
}

function mapStateToProps(state: IStoreState, props: IProps): IMapStateToProps {
  const lsState = state.loresheets[props.lsUid];
  const payloads =
    lsState === undefined
      ? []
      : lsState.filter(o => o.uid === props.uid).map(o => o.payload);

  return {
    canBuy: canBuyLoresheetOption(state, props.lsUid, props.uid),
    cost: getCostBuyLoresheetOption(state, props.lsUid, props.uid),
    known: isLoresheetOptionPresent(state.loresheets, props.lsUid, props.uid),
    lsUid: props.lsUid,
    payloads,
    uid: props.uid
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ILoresheetAction>,
  props: IProps
): IMapDispatchToProps {
  return {
    onBuy: (cost: ICost) => dispatch(buyOption(props.lsUid, props.uid, cost))
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
