import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "../../state/actions/kungfu";
import { getCostKungFuStyle, ICost } from "../../state/costs";
import { canOpenKungFu, isStylePresent } from "../../state/kungfu";
import { ICharacterState } from "../../state/type";

import InternalKungFu, {
  IInternalKungFuProps
} from "../../components/Character/InternalKungFu";

import { KUNGFU_INTERNAL } from "../../data/kungfu/types";

interface IProps {
  uid: string;
}

interface IMapStateToProps {
  canOpen: boolean;
  isOpen: boolean;
  knownTechniques: string[];
  uid: string;
  cost: ICost;
}

interface IMapDispatchToProps {
  onOpen: (cost: ICost) => void;
}

function mapStateToProps(state: ICharacterState, props: IProps): IMapStateToProps {
  const isOpen = isStylePresent(state.kungfu, KUNGFU_INTERNAL, props.uid);

  return {
    canOpen: canOpenKungFu(state.kungfu, KUNGFU_INTERNAL, props.uid),
    cost: getCostKungFuStyle(state, KUNGFU_INTERNAL, props.uid),
    isOpen,
    knownTechniques: isOpen ? state.kungfu[KUNGFU_INTERNAL][props.uid] : [],
    uid: props.uid
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>,
  props: IProps
): IMapDispatchToProps {
  return {
    onOpen: (cost: ICost) =>
      dispatch(actions.openStyle(props.uid, KUNGFU_INTERNAL, cost))
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): IInternalKungFuProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(InternalKungFu);
