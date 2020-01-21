import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { getCostOpenLoresheet, ICost } from "../../state/costs";

import * as actions from "../../state/actions/loresheets";
import { canOpenLoresheet, isLoresheetPresent } from "../../state/loresheets";
import { ICharacterState } from "../../state/type";

import Loresheet, {
  ILoresheetProps
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

function mapStateToProps(state: ICharacterState, props: IProps): IMapStateToProps {
  return {
    canOpen: canOpenLoresheet(state, props.uid),
    cost: getCostOpenLoresheet(state, props.uid),
    known: isLoresheetPresent(state.loresheets, props.uid),
    uid: props.uid
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>,
  props: IProps
): IMapDispatchToProps {
  return {
    onOpen: (cost: ICost) => dispatch(actions.open(props.uid, cost))
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): ILoresheetProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Loresheet);
