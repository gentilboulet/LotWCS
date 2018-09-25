export type IChiNames = 'general' | 'wood' | 'fire' | 'earth' | 'water' | 'metal' | 'enlightened' | 'corrupt';

export const chiNames: IChiNames[] =
[ 'general' , 'wood' , 'fire' , 'earth' , 'water' , 'metal' , 'enlightened' , 'corrupt' ];

export function validateChi(chi: string): void {
  if (! chiNames.find(data => (data === chi)) ) {
    throw new Error('Invalid chi "' + chi + '"');
  }
}
