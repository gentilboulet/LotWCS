import * as Immutable from 'immutable';

import { IKungFuAction } from '../actions/kungfus';
import { IStoreState, IStoreKungFuJS, IStoreKungFuTechniqueJS, techniqueFactory, kungfuFactory } from '../types/state';
import { pushToHistory } from './history';
import { applyCost } from './costs';

import * as constants from '../constants/kungfus';

function _getStateString(type: constants.KUNGFU_TYPE) {
  return (type === constants.KUNGFU_INTERNAL) ? 'internalKungFus' : 'externalKungFus';
}

export function getKungFuIndex(state: IStoreState, type: constants.KUNGFU_TYPE, style: string): number {
  const stateString: string = _getStateString(type);
  return state.get(stateString).findIndex((kf: IStoreKungFuJS) => (kf.uid === style));
}

export function getKungFuTechniqueIndex(
  state: IStoreState, type: constants.KUNGFU_TYPE, style: string, technique: string): number {
  const stateString: string = _getStateString(type);
  const styleIndex = getKungFuIndex(state, type, style);
  if (styleIndex === -1) {
    throw new Error('Something went wrong, ' + type + ' kungfu not found');
  }
  return state.getIn([stateString, styleIndex, 'techniques'])
    .findIndex((tech: IStoreKungFuTechniqueJS) => (tech.uid === technique));
}

export function openStyle(state: IStoreState, type: constants.KUNGFU_TYPE, style: string): void {
  const stateString: string = _getStateString(type);
  state.updateIn([stateString], list => list.push(
      kungfuFactory({ name: style, uid: style, techniques: Immutable.List() })
    )
  );
}

export function buyTechnique(state: IStoreState, type: constants.KUNGFU_TYPE, style: string, technique: string): void {
  const stateString: string = _getStateString(type);
  const styleIndex = getKungFuIndex(state, type, style);
  if (styleIndex === -1) {
    throw new Error('Something went wrong, ' + type + ' kungfu not found');
  }

  const techniqueIndex = getKungFuTechniqueIndex(state, type, style, technique);
  if (techniqueIndex !== -1) {
   throw new Error('Something went wrong, ' + type + ' technique already bought');
  }

  state.updateIn([stateString, styleIndex, 'techniques'], list => list.push(
      techniqueFactory({ name: technique, uid: technique })
    )
  );
}

export function kungfuReducer(oldState: IStoreState, action: IKungFuAction): IStoreState {
  switch (action.type) {
      case constants.KUNGFU_OPEN_STYLE:
        return oldState.withMutations(state => {
          applyCost(state, action.cost);
          openStyle(state, action.kungfuType, action.uid);
          pushToHistory(state, action);
        });
      case constants.KUNGFU_BUY_TECHNIQUE:
        return oldState.withMutations(state => {
          applyCost(state, action.cost);
          buyTechnique(state, action.kungfuType, action.styleUid, action.uid);
          pushToHistory(state, action);
        });
      case constants.KUNGFU_CUSTOM_NAME_FOR_STYLE:
      case constants.KUNGFU_CUSTOM_NAME_FOR_TECHNIQUE:
    default:
  }
  return oldState;
}
