import CharacterHeader from '../../components/CharacterHeader';
import * as actions from '../../actions/header';
import { StoreState } from '../../types/index';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps(state: StoreState) {
  return {
    name: state.get('name'),
    concept: state.get('concept')
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.HeaderAction>) {
  return {
    onSetName: (s: string) => dispatch(actions.headerSetName(s)),
    onSetConcept: (s: string) => dispatch(actions.headerSetConcept(s)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterHeader);
