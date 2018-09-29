import { IStoreState } from 'state/type';

import { createState as createHistoryState } from 'state/history';

import { createState as createChiState } from 'state/chi';
import { createState as createaKungFuState } from 'state/kungfu';
import { createState as createLoresheetsState } from 'state/loresheets';
import { createState as createSkillsState } from 'state/skills';
import { createState as createVirtuesState } from 'state/virtues';

function emptyInitialStateFactory(): IStoreState {
  return {
    archetype: undefined,
    concept: undefined,
    name: undefined,
    rank: undefined,

    destiny: 0,
    entanglement: 0,

    history: createHistoryState(),

    chi: createChiState(),
    kungfu: createaKungFuState(),
    loresheets: createLoresheetsState(),
    skills: createSkillsState(),
    virtues: createVirtuesState(),
  }
}

import { setArchetype, setRank } from 'state/actions/header';
import { replayHistory } from './history';

export function testingStateFactory(): IStoreState {
  const initial = emptyInitialStateFactory();
  const actions = [
    setRank('4th_rank'),
    setArchetype('warrior')
  ];
  return replayHistory(initial, actions);
}

export function initialStateFactory(): IStoreState {
  return emptyInitialStateFactory();
}
