export type IChiNames = 'general' | 'wood' | 'fire' | 'earth' | 'water' | 'metal' | 'enlightened' | 'demon';
export type IChiCultivations = 'generalCultivation' | 'woodCultivation' | 'fireCultivation' | 'earthCultivation'
  | 'waterCultivation' | 'metalCultivation' | 'enlightenedCultivation' | 'demonCultivation';

export const chiNames: IChiNames[] =
[ 'general' , 'wood' , 'fire' , 'earth' , 'water' , 'metal' , 'enlightened' , 'demon' ];

export const cultivationNames: IChiCultivations[] =
[ 'generalCultivation' , 'woodCultivation' , 'fireCultivation' , 'earthCultivation'
  , 'waterCultivation' , 'metalCultivation' , 'enlightenedCultivation' , 'demonCultivation' ];

export function validateChi(chi: string): void {
  if (! chiNames.find(data => (data === chi)) ) {
    throw new Error('Invalid chi "' + chi + '"');
  }
}

export function validateCultivation(cultivation: string): void {
  if (! cultivationNames.find(data => (data === cultivation)) ) {
    throw new Error('Invalid chi cultivation "' + cultivation + '"');
  }
}

export function fromChiToCultivationName(chi: IChiNames): IChiCultivations {
  validateChi(chi);
  return chi.concat('Cultivation') as IChiCultivations;
}

export function fromCultivationToChiName(cultivation: IChiCultivations): IChiNames {
  validateCultivation(cultivation);
  return cultivation.split('Cultivation')[0] as IChiNames;
}
