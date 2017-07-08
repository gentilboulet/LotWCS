import CharacterHeader, { ICharacterHeaderProps } from '../components/CharacterHeader';
import * as actions from '../actions/header';
import { IStoreState } from '../types/state';
import { connect, Dispatch } from 'react-redux';

interface IMapStateToProps {
  name: string;
  concept: string;
  archetype: string;
  rank: string;
  destiny: number;
  entanglement: number;

  lockArchetype: boolean;
  lockRank: boolean;
}

interface IMapDispatchToProps {
  onSetName: (s: string) => void;
  onSetConcept: (s: string) => void;
  onSetArchetype: (s: string) => void;
  onSetRank: (s: string) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    name: state.get('name'),
    concept: state.get('concept'),
    archetype: state.get('archetype'),
    rank: state.get('rank'),
    entanglement: state.get('entanglement'),
    destiny: state.get('destiny'),

    lockArchetype: state.get('rankModified'),
    lockRank: state.get('rankModified')
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.IHeaderAction>): IMapDispatchToProps {
  return {
    onSetName: (s: string) => dispatch(actions.headerSetName(s)),
    onSetConcept: (s: string) => dispatch(actions.headerSetConcept(s)),
    onSetArchetype: (s: string) => dispatch(actions.headerSetArchetype(s)),
    onSetRank: (s: string) => dispatch(actions.headerSetRank(s)),
  };
}

function mergeProps(
  mapStateToProps: IMapStateToProps,
  mapDispatchToProps: IMapDispatchToProps
): ICharacterHeaderProps {
  return Object.assign(mapStateToProps, mapDispatchToProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterHeader);
