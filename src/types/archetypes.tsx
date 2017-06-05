export interface IDataArchetype {
  name: string;
  desc: string;
  key: string;
  breath: string;
}

export interface IDataArchetypes extends Array<IDataArchetype> {}
