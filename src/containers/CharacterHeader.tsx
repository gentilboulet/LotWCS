import { connect, Dispatch } from 'react-redux';

import * as headerActions from 'state/actions/header';
import { IStoreState } from 'state/types';

import CharacterHeader, { ICharacterHeaderProps } from 'components/CharacterHeader';

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

function mapDispatchToProps(dispatch: Dispatch<headerActions.IHeaderAction>): IMapDispatchToProps {
  return {
    onSetName: (s: string) => dispatch(headerActions.setName(s)),
    onSetConcept: (s: string) => dispatch(headerActions.setConcept(s)),
    onSetArchetype: (s: string) => dispatch(headerActions.setArchetype(s)),
    onSetRank: (s: string) => dispatch(headerActions.setRank(s)),
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): ICharacterHeaderProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterHeader);
