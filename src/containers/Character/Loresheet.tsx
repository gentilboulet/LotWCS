import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import {
  getCostOpenLoresheet,
  ICost,
} from "../../state/character/models/costs";

import { IStoreState } from "../../state";
import * as actions from "../../state/character/actions/loresheets";
import {
  canOpenLoresheet,
  isLoresheetPresent,
} from "../../state/character/models/loresheets";

import Loresheet, {
  ILoresheetProps,
} from "../../components/Character/Loresheet";

interface IMapStateToProps {
  canOpen: boolean;
  cost: ICost;
  known: boolean;
  uid: string;
}

interface IMapDispatchToProps {
  onOpen: (cost: ICost) => void;
}

interface IProps {
  uid: string;
}

function mapStateToProps(state: IStoreState, props: IProps): IMapStateToProps {
  return {
    canOpen: canOpenLoresheet(state.character, props.uid),
    cost: getCostOpenLoresheet(state.character, props.uid),
    known: isLoresheetPresent(state.character.loresheets, props.uid),
    uid: props.uid,
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>,
  props: IProps,
): IMapDispatchToProps {
  return {
    onOpen: (cost: ICost) => dispatch(actions.open(props.uid, cost)),
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps,
): ILoresheetProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Loresheet);
