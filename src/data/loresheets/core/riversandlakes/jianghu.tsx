import { IDataLoresheet } from 'data/loresheets';

/* tslint:disable:max-line-length */
/* tslint:disable:object-literal-sort-keys */
export const jianghu: IDataLoresheet = {
  uid: 'jianghu',
  name: 'The Jiang Hu',
  category: 'Rivers and Lakes',
  cost: 0,
  ruleset: 'core',
  description: 'Within Shen Zhou, there is a parallel world of outsiders and outcasts. Some are born into this world, others are forced into it, and many more choose to live in it to escape the boundaries and limitations imposed on them by regular society. The heroes and rogues within this world are abjured by the common people as threats to an orderly life, but for many they represent a hope of escape, or advancement, from a life controlled by tradition.',
  options: [
    {
      uid: 'familiarity',
      cost: '2',
      type: 'Bonus',
      description: 'You know how to navigate the Rivers and Lakes outside the Wulin organizations, in other Jiang Hu communities like the criminal underground, the ferrymen guilds, or the pleasure trade. Pick one such group; you get a +5 bonus to social rolls where familiarity with that subculture matters.',
      repeatable: true,
      prerequisites: [],
      perks: [],
    },
    {
      uid: 'knunderground',
      cost: '2+',
      type: 'Fortune',
      description: 'Once per session, upon arriving in a new location, you may declare to have basic knowledge of the local Jiang Hu underground, including important organizations and who’s in charge. This includes Wulin factions.',
      repeatable: true,
      prerequisites: [],
      perks: [],
    },
    {
      uid: 'statusunderground',
      cost: '1-5',
      description: 'You are already known within one or more of the aforementioned organizations, and have some Status with them.',
      type: 'Status',
      repeatable: true,
      prerequisites: [
        {type: 'OR', prerequisites: ['familiarity', 'knunderground']}
      ],
      perks: [],
    }
  ],
};
