import { IDataLoresheet } from 'data/loresheets';
import { bonusOneAmongN, bonusSpeciality } from 'state/actions/perks/bonuses';

/* tslint:disable:max-line-length */
/* tslint:disable:object-literal-sort-keys */
export const crouchingtigersandhiddendragons: IDataLoresheet = {
  uid: 'tigersanddragons',
  name: 'Crouching Tigers and Hidden Dragons',
  category: 'Rivers and Lakes',
  cost: 1,
  ruleset: 'core',
  description: 'The saying goes, “The Jiang Hu is full of Crouching Tigers and Hidden Dragons”. So many in the martial community have every reason to hide their true face, and their true power. Who knows who might prove to be a powerful fighter in seclusion?',
  options: [
    {
      uid: 'hiddenid',
      cost: '0-5',
      type: 'Disadvantage',
      description: 'You are hiding your true identity behind a disguise. Are you a noble passing as a beggar? Are you masquerading as someone of the opposite gender? Do you pretend to be a member of a certain organization while in reality serving another? Once a session, whenever the veil of your disguise seems to be pierced and protecting your fake identity gets you in trouble, earn 1 additional Destiny. If this is your first or second disadvantage you can get it for free, otherwise it costs 5 Destiny.',
      repeatable: false,
      prerequisites: [],
      perks: [],
    },
    {
      uid: 'stabbingguesttechnique',
      cost: '3',
      description: 'Following in the traditions of the Cike of the past, you learn or develop the Stabbing Guest Technique. This helps you when you seek to gain the trust of someone that you seek to hurt, damage, or destroy! As long as you have this stated purpose and make sure to describe your actions as fitting with your devious plans, you get a +5 Action Bonus to all appropriate social rolls to gain their trust, appear friendly and harmless, and enter into their confidence. This bonus is lost if you stop harboring bad intentions.',
      type: 'Secret',
      repeatable: false,
      prerequisites: [],
      perks: [],
    },
    {
      uid: 'sensechi',
      cost: '3',
      description: 'Get the Wu Wei Specialty: Sense Chi or the Stealth Specialty: Hide Killer Intent for free',
      type: 'Bonus',
      repeatable: false,
      prerequisites: [],
      perks: [bonusOneAmongN(
        [
          bonusSpeciality('Wu Wei', 'Sense Chi'),
          bonusSpeciality('Wu Wei', 'Hide Killer Intent')
        ])
      ],  }
  ],
};
