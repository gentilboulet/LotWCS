import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as headerActions from 'state/actions/header';
import { IStoreState } from 'state/type';

import CharacterHeader, { ICharacterHeaderProps } from 'components/CharacterHeader';

interface IMapStateToProps {
  name: string | undefined;
  concept: string | undefined;
  archetype: string | undefined;
  rank: {name: string, value: number}| undefined;
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

/* tslint:disable */
function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    archetype: state.archetype,
    concept: state.concept,
    destiny: state.destiny,
    entanglement: state.entanglement,
    name: state.name,
    rank: state.rank,

    lockArchetype: state.archetype !== undefined,
    lockRank: state.rank !== undefined
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
