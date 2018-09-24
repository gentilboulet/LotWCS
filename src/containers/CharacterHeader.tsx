import { connect } from 'react-redux';
import { Dispatch } from 'redux';

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
    archetype: state.get('archetype'),
    concept: state.get('concept'),
    destiny: state.get('destiny'),
    entanglement: state.get('entanglement'),
    name: state.get('name'),
    rank: state.get('rank'),

    lockArchetype: state.get('rankModified'),
    lockRank: state.get('rankModified')
  };
}

function mapDispatchToProps(dispatch: Dispatch<headerActions.IHeaderAction>): IMapDispatchToProps {
  return {
    onSetArchetype: (s: string) => dispatch(headerActions.setArchetype(s)),
    onSetConcept: (s: string) => dispatch(headerActions.setConcept(s)),
    onSetName: (s: string) => dispatch(headerActions.setName(s)),
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
