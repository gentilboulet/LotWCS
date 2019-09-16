import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "../../state/actions/header";
import { IStoreState } from "../../state/type";

import Name, { INameProps } from "../../components/Character/Name";

interface IMapStateToProps {
  value: string;
}

interface IMapDispatchToProps {
  onChange: (s: string) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    value: state.name !== undefined ? state.name : ""
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>
): IMapDispatchToProps {
  return {
    onChange: (s: string) => dispatch(actions.setName(s))
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): INameProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Name);
