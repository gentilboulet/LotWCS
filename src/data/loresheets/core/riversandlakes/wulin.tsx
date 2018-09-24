import { IDataLoresheet } from 'data/loresheets';

/* tslint:disable:max-line-length */
/* tslint:disable:object-literal-sort-keys */
export const wulin: IDataLoresheet = {
  uid: 'wulin',
  name: 'The Wulin',
  category: 'Rivers and Lakes',
  cost: 0,
  ruleset: 'core',
  description: 'The Wulin is considered a greater family for those who dedicate their lives to the martial arts, regardless of their origins and goals, for only a warrior can truly understand another warrior, even if they stand on opposite sides of the battlefield. It is said that Heaven has a place assigned for everyone. The path of Kung Fu is for those who reject this idea, who believe that fate is in their hands, and that their fortunes are forged by the strength of their spirit and the fire of their passion.',
  options: [
    {
      uid: 'tieswithanother',
      cost: '1+',
      type: 'Involvement',
      description: 'The World of Martial Arts is full of heroes. Some heroes become teachers, friends closer than brothers, lovers, or soul mates, while others become sworn rivals or hated enemies. Spend destiny to tie your fate to that of any other character that may appeal to you. In order to declare an existing relationship between the two of you, make a current action (such as defeating them in battle or showing up to assist them), or make sure that you will develop such a relationship shortly. As usual, refer to Introduction to Loresheets for costs.',
      repeatable: true,
      prerequisites: [],
      perks: [],
    },
    {
      uid: 'historicalfact',
      cost: '3+',
      type: 'Fortune',
      description: 'The history of the Wulin is shrouded in the mists of legends and myths, but you manage to shine a light on one particular facet! Introduce a historical fact of your own design that pertains to your current situation and which gives you an advantage of some sort, such as an alternative solution to a problem. This might concern a person, an organization, or even the Wulin as a whole. Needless to say, the Sage is the final arbitrator of cost.',
      repeatable: true,
      prerequisites: [],
      perks: [],
    }
  ],
};
