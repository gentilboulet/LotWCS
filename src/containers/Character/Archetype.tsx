import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { IStoreState } from "../../state";
import * as actions from "../../state/character/actions/header";

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
    locked: state.character.archetype !== undefined,
    value:
      state.character.archetype !== undefined ? state.character.archetype : ""
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
