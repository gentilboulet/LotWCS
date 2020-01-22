import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { IStoreState } from "../../state";
import * as actions from "../../state/character/actions/header";

import Concept, { IConceptProps } from "../../components/Character/Concept";

interface IMapStateToProps {
  value: string;
}

interface IMapDispatchToProps {
  onChange: (s: string) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    value: state.character.concept !== undefined ? state.character.concept : ""
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>
): IMapDispatchToProps {
  return {
    onChange: (s: string) => dispatch(actions.setConcept(s))
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): IConceptProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Concept);
