import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "../../state/actions/header";
import { IStoreState } from "../../state/type";

import { TArchetype } from "../../data/archetypes";

import Archetype, {
  IArchetypeProps
} from "../../components/Character/Archetype";

interface IMapStateToProps {
  locked: boolean;
  value: string;
}

interface IMapDispatchToProps {
  onChange: (s: TArchetype) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    locked: state.archetype !== undefined,
    value: state.archetype !== undefined ? state.archetype : ""
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>
): IMapDispatchToProps {
  return {
    onChange: (s: TArchetype) => dispatch(actions.setArchetype(s))
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
