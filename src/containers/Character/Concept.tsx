import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as headerActions from "../../state/actions/header";
import { IStoreState } from "../../state/type";

import Concept, { IConceptProps } from "../../components/Character/Concept";

interface IMapStateToProps {
  value: string;
}

interface IMapDispatchToProps {
  onChange: (s: string) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    value: state.concept !== undefined ? state.concept : ""
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<headerActions.IHeaderAction>
): IMapDispatchToProps {
  return {
    onChange: (s: string) => dispatch(headerActions.setConcept(s))
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
