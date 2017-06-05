import {TypedRecord} from 'typed-immutable-record';

export interface StoreData {
  name: string;
  concept: string;
}

export interface StoreState extends TypedRecord<StoreState>, StoreData {}
