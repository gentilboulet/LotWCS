import { IDataLoresheet } from 'data/loresheets';

/* tslint:disable:max-line-length */
/* tslint:disable:object-literal-sort-keys */
export const wulinsage: IDataLoresheet = {
  uid: 'wulinsage',
  name: 'The Wulin Sage',
  category: 'Rivers and Lakes',
  cost: 0,
  ruleset: 'core',
  description: 'Legends speak of a mythical figure that oversees the Wulin on behalf of Heaven. The Sage records all of the history and affairs of the martial world; he decides who is worthy of advancement and reports to the Celestial Order on the advancement and deeds of Chivalrous heroes, and to the Hellish Courts on those of the selfish. He sees that those who seek greater challenges reap greater glory and attain higher power.',
  options: [
    {
      uid: 'fact',
      cost: '5+',
      type: 'Fortune',
      description: 'With Sage approval, you may introduce a fact about the truth behind the Wulin Sage that would influence the current story.',
      repeatable: true,
      prerequisites: [],
      perks: [],
    },
    {
      uid: 'tieswithsage',
      cost: '5+',
      type: 'Involvement',
      description: 'Your destiny will be tied to the figure of the Wulin Sage.',
      repeatable: false,
      prerequisites: [],
      perks: [],
    },
    {
      uid: 'tiensnpcwithsage',
      cost: '3+',
      type: 'Involvement',
      description: 'The Destiny of an NPC of your choice will be or is tied to the figure of the Wulin Sage.',
      repeatable: true,
      prerequisites: [],
      perks: [],
    }
  ],
};
