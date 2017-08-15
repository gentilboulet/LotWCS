import * as Immutable from 'immutable';

import { IStoreState, IStoreKungFuJS, IStoreKungFuTechniqueJS, techniqueFactory, kungfuFactory } from 'state/types';

import * as datas from 'data/kungfus';

function _getStateString(type: datas.KUNGFU_TYPE) {
  return (type === datas.KUNGFU_INTERNAL) ? 'internalKungFus' : 'externalKungFus';
}

export function getKungFuIndex(state: IStoreState, type: datas.KUNGFU_TYPE, style: string): number {
  const stateString: string = _getStateString(type);
  return state.get(stateString).findIndex((kf: IStoreKungFuJS) => (kf.uid === style));
}

export function getKungFuTechniqueIndex(
  state: IStoreState, type: datas.KUNGFU_TYPE, style: string, technique: string): number {
  const stateString: string = _getStateString(type);
  const styleIndex = getKungFuIndex(state, type, style);
  if (styleIndex === -1) {
    throw new Error('Something went wrong, ' + type + ' kungfu not found');
  }
  return state.getIn([stateString, styleIndex, 'techniques'])
    .findIndex((tech: IStoreKungFuTechniqueJS) => (tech.uid === technique));
}

export function openStyle(state: IStoreState, type: datas.KUNGFU_TYPE, style: string): void {
  const stateString: string = _getStateString(type);
  state.updateIn([stateString], list => list.push(
      kungfuFactory({ name: style, uid: style, techniques: Immutable.List() })
    )
  );
}

export function buyTechnique(state: IStoreState, type: datas.KUNGFU_TYPE, style: string, technique: string): void {
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
