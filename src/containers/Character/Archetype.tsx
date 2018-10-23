import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as headerActions from "state/actions/header";
import { IStoreState } from "state/type";

import Archetype, { IArchetypeProps } from "components/Character/Archetype";

interface IMapStateToProps {
  locked: boolean;
  value: string;
}

interface IMapDispatchToProps {
  onChange: (s: string) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    locked: state.archetype !== undefined,
    value: state.archetype !== undefined ? state.archetype : ""
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<headerActions.IHeaderAction>
): IMapDispatchToProps {
  return {
    onChange: (s: string) => dispatch(headerActions.setArchetype(s))
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): IArchetypeProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Archetype);
