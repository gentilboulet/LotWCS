import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import History, { IHistoryProps } from "../../components/Character/History";

import { IStoreState } from "../../state";
import { ICharacterAction } from "../../state/character";
import * as meta from "../../state/actions/meta";

interface IMapStateToProps {
  history: ICharacterAction[];
}

interface IMapDispatchToProps {
  onReplay: (actions: ICharacterAction[]) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return { history: state.history.actions };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof meta>>,
): IMapDispatchToProps {
  return {
    onReplay: (actions: ICharacterAction[]) => {
      dispatch(meta.characterHistoryReplay(actions));
    },
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps,
): IHistoryProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(History);
