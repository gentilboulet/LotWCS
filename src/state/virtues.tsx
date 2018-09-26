import { IDataVirtue, IDataVirtueType, virtues } from 'data/virtues';

interface IVirtueState {
    name: string;
    value: number;
    type: IDataVirtueType;
}

export type TVirtuesState = IVirtueState[];

export function createState(): TVirtuesState {
  return virtues.map((virtue: IDataVirtue) => {
    return { name: virtue.name, value: 0, type: virtue.type };
  });
}

export function add(state: TVirtuesState, name: string, type: IDataVirtueType): void {
  state.push({ name, value: 0, type });
}

export function increase(state: TVirtuesState, name: string, value: number): void {
  state.forEach(virtue => {
    if(virtue.name === name) { virtue.value+= value; }
  })
}

export function isVirtuePresent(state: TVirtuesState, name: string): boolean {
  return state.findIndex(virtue => name === virtue.name) !== -1;
}

export function getVirtue(state: TVirtuesState, name: string): IVirtueState | undefined {
  return state.find(virtue => name === virtue.name);
}
