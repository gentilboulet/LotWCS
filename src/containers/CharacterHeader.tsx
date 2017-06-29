import CharacterHeader from '../components/CharacterHeader';
import * as actions from '../actions/header';
import { IStoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

interface ImapStateToProps {
  name: string;
  concept: string;
  archetype: string;
  rank: string;

  lockArchetype: boolean;
  lockRank: boolean;
}

interface ImapDispatchToProps {
  onSetName: (s: string) => void;
  onSetConcept: (s: string) => void;
  onSetArchetype: (s: string) => void;
  onSetRank: (s: string) => void;
}

function mapStateToProps(state: IStoreState): ImapStateToProps {
  return {
    name: state.get('name'),
    concept: state.get('concept'),
    archetype: state.get('archetype'),
    rank: state.get('rank'),

    lockArchetype: state.get('archetypeModified'),
    lockRank: state.get('rankModified')
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.IHeaderAction>): ImapDispatchToProps {
  return {
    onSetName: (s: string) => dispatch(actions.headerSetName(s)),
    onSetConcept: (s: string) => dispatch(actions.headerSetConcept(s)),
    onSetArchetype: (s: string) => dispatch(actions.headerSetArchetype(s)),
    onSetRank: (s: string) => dispatch(actions.headerSetRank(s)),
  };
}

function mergeProps(mapStateToProps: ImapStateToProps, mapDispatchToProps: ImapDispatchToProps) {
  return Object.assign({}, mapStateToProps, mapDispatchToProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterHeader);
