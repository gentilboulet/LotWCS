import { IDataRanks } from '../types/ranks';
import * as bonus from '../actions/bonuses';
import * as reduction from '../actions/reductions';

export const ranks: IDataRanks = [
  {
    name: 'Unranked',
    desc: 'River size and Joss limit are 1, no Aura or Chi replenishment, Lake is 5, maximum skill bonus is +5.',
    key: 'unranked',
    value: 0,
    perks: [bonus.destiny(10), reduction.skill(10), bonus.startingChi(8)]
  }, {
    name: '5th Rank',
    desc: 'River size, Joss, Chi replenishment and Chi Aura limit are 1. Lake size is 6. Maximum skill bonus is +5.',
    key: '5th_rank',
    value: 1,
    perks: [bonus.destiny(15), reduction.skill(10), bonus.startingChi(8)]
  }, {
    name: '4th Rank',
    desc: 'River size, Joss, Chi replenishment and Chi Aura limit are 2. Lake size is 7. Maximum skill bonus is +10.',
    key: '4th_rank',
    value: 2,
    perks: [bonus.destiny(20), reduction.skill(20), bonus.startingChi(10)]
  }, {
    name: '3rd Rank',
    desc: 'River size, Joss, Chi replenishment and Chi Aura limit are 3. Lake size is 8. Maximum skill bonus is +15.',
    key: '3rd_rank',
    value: 3,
    perks: [bonus.destiny(50), reduction.skill(20), bonus.startingChi(10)],
  }, {
    name: '2nd Rank',
    desc: 'River size, Joss, Ch, replenishment and Chi Aura limit are 4. Lake size is 9. Maximum skill bonus is +20.',
    key: '2nd_rank',
    value: 4,
    perks: [bonus.destiny(100), reduction.skill(20), bonus.startingChi(10)],
  }, {
    name: '1st Rank',
    desc: 'River size, Joss, Chi replenishment and Chi Aura limit are 5. Lake size is 10. Maximum skill bonus is +25.',
    key: '1st_rank',
    value: 5,
    perks: [bonus.destiny(150), reduction.skill(20), bonus.startingChi(10)],
  }
];
