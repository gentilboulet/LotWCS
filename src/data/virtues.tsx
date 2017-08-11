export const VIRTUE_CHIVALROUS = 'VIRTUE_CHIVALROUS';
export type VIRTUE_CHIVALROUS = typeof VIRTUE_CHIVALROUS;

export const VIRTUE_SELFISH = 'VIRTUE_SELFISH';
export type VIRTUE_SELFISH = typeof VIRTUE_SELFISH;

export type IDataVirtueType = VIRTUE_SELFISH | VIRTUE_CHIVALROUS;

export interface IDataVirtue {
  name: string;
  type: IDataVirtueType;
}

export const virtues: IDataVirtue[] = [
  {name: 'Honor', type: VIRTUE_CHIVALROUS},
  {name: 'Benevolence', type: VIRTUE_CHIVALROUS},
  {name: 'Righteousness', type: VIRTUE_CHIVALROUS},
  {name: 'Loyalty', type: VIRTUE_CHIVALROUS},
  {name: 'Force', type: VIRTUE_CHIVALROUS},
  {name: 'Revenge', type: VIRTUE_SELFISH},
  {name: 'Individualism', type: VIRTUE_SELFISH},
  {name: 'Obsession', type: VIRTUE_SELFISH},
  {name: 'Ruthlessness', type: VIRTUE_SELFISH},
  {name: 'Ferocity', type: VIRTUE_SELFISH}
];
