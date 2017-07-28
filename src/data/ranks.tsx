import { IDataRanks } from '../types/ranks';

import * as bonus from '../actions/bonuses';
import * as discount from '../actions/discounts';

export const ranks: IDataRanks = [
  {
    desc: 'River size and Joss limit are 1, no Aura or Chi replenishment, Lake is 5, maximum skill bonus is +5.',
    key: 'unranked',
    name: 'Unranked',
    perks: [bonus.destiny(10), discount.discountSkillFactory(10), bonus.chi(8, 'general')],
    value: 0,
  }, {
    desc: 'River size, Joss, Chi replenishment and Chi Aura limit are 1. Lake size is 6. Maximum skill bonus is +5.',
    key: '5th_rank',
    name: '5th Rank',
    perks: [bonus.destiny(15), discount.discountSkillFactory(10), bonus.chi(8, 'general')],
    value: 1,
  }, {
    desc: 'River size, Joss, Chi replenishment and Chi Aura limit are 2. Lake size is 7. Maximum skill bonus is +10.',
    key: '4th_rank',
    name: '4th Rank',
    perks: [bonus.destiny(20), discount.discountSkillFactory(20), bonus.chi(10, 'general')],
    value: 2,
  }, {
    desc: 'River size, Joss, Chi replenishment and Chi Aura limit are 3. Lake size is 8. Maximum skill bonus is +15.',
    key: '3rd_rank',
    name: '3rd Rank',
    perks: [bonus.destiny(50), discount.discountSkillFactory(20), bonus.chi(10, 'general')],
    value: 3,
  }, {
    desc: 'River size, Joss, Ch, replenishment and Chi Aura limit are 4. Lake size is 9. Maximum skill bonus is +20.',
    key: '2nd_rank',
    name: '2nd Rank',
    perks: [bonus.destiny(100), discount.discountSkillFactory(20), bonus.chi(10, 'general')],
    value: 4,
  }, {
    desc: 'River size, Joss, Chi replenishment and Chi Aura limit are 5. Lake size is 10. Maximum skill bonus is +25.',
    key: '1st_rank',
    name: '1st Rank',
    perks: [bonus.destiny(150), discount.discountSkillFactory(20), bonus.chi(10, 'general')],
    value: 5,
  }
];
