import { IDataExternalKungfu } from 'data/kungfu/types';
import * as effects from 'state/actions/perks/effects';

/* tslint:disable:max-line-length */
/* tslint:disable:object-literal-sort-keys */

export const blossomHarvest: IDataExternalKungfu = {
  name: 'Blossom Harvest',
  uid: 'Blossom Harvest',
  weapons: ['Massive', 'Staff', 'Unarmed'],
  laugths: 'A chain is only as strong as its weakest link, and so Blossom Harvest laughs at styles that are overly complicated or full of flourishes. These intricate methods are easily smashed aside and broken. It likewise laughs at such trivialities as being outnumbered, or disadvantageous terrain – pure grit and hellish training have rendered Blossoming Heroes fearless to such things!',
  fears: 'This style has problems when facing fighters who are reactive. Blossom Harvest’s openness is easy to read and predict, giving such opponents everything they need. It’s also ill-prepared for enemies who wield supernatural forces or influence.',
  statistics: {
    speed: 5,
    footwork: 0,
    strike: 5,
    damage: 10,
    block: 5,
    toughness: 10
  },
  techniques: [
    {
      name: 'Heart-Fire Temper Skill',
      cost: 4,
      description: 'Pain and fear blunt edges worse than rust, but your training has seen every bone broken and regrown stronger. To you, pain is but a reminder of your lessons and your teacher’s wisdom.',
      effect: effects.conditionalOnelineText('When you have a physical wound condition, this style’s Damage bonus increases to +15.'),
      uid: 'Heart-Fire Temper Skill',
    },
    {
      name: 'Iron Skin',
      cost: 5,
      description: 'Hardened muscles and willpower have given you great resistance to physical punishment. Spears bend and sticks break upon striking you!',
      effect: effects.combatStatistic('toughness', 5),
      uid: 'Iron Skin'
    },
    {
      name: 'Iron Skin',
      uid: 'Iron Skin 2',
      cost: 4,
      description: 'Hardened muscles and willpower have given you great resistance to physical punishment. Spears bend and sticks break upon striking you!',
      effect: effects.increaseBaseChiForThreshold(2),
      prerequisites: [{uid: 'iron_skin_1'}]
    },
    {
      name: 'Nine Mountains Great Strength',
      uid: 'Nine Mountains Great Strength',
      cost: 5,
      description: 'Your attacks are like mountains: grand and overwhelming, undeniable and unmovable.',
      effect: effects.combatStatistic('strike', 5),
    },
    {
      name: 'No Vermin in the World',
      uid: 'No Vermin in the World',
      cost: 2,
      description: 'The corrupt are numerous and the virtuous seem but few these days. Villages are razed to the ground and orphans cry in the streets. The great men of this age therefore have no choice but to be Blossoming Heroes, fighting off entire gangs all by themselves!',
      effect: effects.conditionalOnelineText('All your attacks count as Area attacks for the purpose of damaging groups of Minions.')
    },
  ],
};
