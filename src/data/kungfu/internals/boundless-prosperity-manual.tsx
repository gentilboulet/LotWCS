/* tslint:disable:max-line-length */
/* tslint:disable:object-literal-sort-keys */

import { IDataInternalKungfu } from 'data/kungfu/types';
import * as effects from 'state/actions/perks/effects';

export const boundlessProsperityManual: IDataInternalKungfu = {
  name: 'Boundless Prosperity Manual',
  uid: 'Boundless Prosperity Manual',
  element: 'wood',
  techniques: [
    {
      level: 1,
      name: 'Retain Balanced Nature',
      uid: 'Retain Balanced Nature',
      description: 'You promote the circulation of breath throughout your system by clearing away pollutants and obstructions.',
      effect: effects.conditionalOnelineText('You have a +5 bonus to a roll made to remove a Disoriented or Disrupted Marvel, provided the Marvel is described as being caused by pain, blocked pressure points, injuries, or similar effects. You can also make such checks using only a single die, instead of needing a set.')
    }, {
      level: 2,
      name: 'Act Without Resistance',
      uid: 'Act Without Resistance',
      description: 'One of the many techniques of physical augmentation, the manual teaches you how to achieve a forcefulness in your movements that sweeps away opposing powers.',
      effect: effects.conditionalOnelineText('You have a +10 bonus to Damage.')
    }, {
      level: 2,
      name: 'Be Where You Must',
      uid: 'Be Where You Must',
      description: 'The key to increased physical potency isn\'t just greater power, but knowing when to show restraint. Precision can cut away unnecessary motion and purify your movement.',
      effect: effects.conditionalText([
        'Round-long duration.',
        'You have a +10 bonus to Footwork.'
      ])
    }, {
      level: 2,
      name: 'Move According To Purpose',
      uid: 'Move According To Purpose',
      description: 'Many act without being truly aware of what they are doing. You cast aside such sleepwalking and go through life with certainty and flawlessness.',
      effect: effects.conditionalOnelineText('You have a +10 bonus to Strike.')
    }, {
      level: 2,
      name: 'Understand What You See',
      uid: 'Understand What You See',
      description: 'Hone your mind to clarity. All phenomena and occurrences will become obvious!',
      effect: effects.conditionalOnelineText('You have a +10 bonus to Speed.')
    }, {
      level: 3,
      name: 'Covering Weakness with Strength',
      uid: 'Covering Weakness with Strength',
      description: 'Many people in need of the Manual are sick, crippled or scarred. It can’t restore what is truly lost, but it can help overcome the troubles these unfortunate conditions bring.',
      effect: effects.conditionalText([
        'Round-long duration. You may spend one Chi per round to extend the technique’s duration another round; you must spend the Chi at the beginning of each new round.',
        'Treat your Injury Conditions as if they were one step less severe when determining the Action or Breath penalty they inflict.',
        'This doesn’t cure or reduce the conditions, only their effects.'
      ])
    }, {
      level: 3,
      name: 'Fortifying Oneself against the World',
      uid: 'Fortifying Oneself against the World',
      description: 'The world is filled with harmful maladies that can damage your organs. The manual teaches methods which bolster the body against such dangers.',
      effect: effects.conditionalText([
        'Round-long duration.',
        'You have a +10 bonus to your Hardiness and to Chi Aura when resisting Rippling rolls caused by the Doctor’s Arts.',
      ])
    }, {
      level: 3,
      name: 'Reflexes Like Lightning',
      uid: 'Reflexes Like Lightning',
      description: 'Life is tenacious and adaptive. If you can fully attain these qualities, then you can truly be a master of yourself and of others.',
      effect: effects.conditionalOnelineText('You have a +10 bonus to any Marvel or attempt to break a Wave.')
    }, {
      level: 4,
      name: 'Five Elements Supreme Combination',
      uid: 'Five Elements Supreme Combination',
      description: 'You can use internal alchemy to directly enhance the workings of your body.',
      effect: effects.conditionalText([
        'Round-long duration.',
        'You have a +15 bonus to your Speed, Footwork, Strike, Damage, Block, or Toughness.',
        'You may boost this technique, adding the bonus to another statistic for every two Chi you spend.'
      ])
    }, {
      level: 4,
      name: 'King of Heaven Shapes the Earth',
      uid: 'King of Heaven Shapes the Earth',
      description:  'You are struck by a fatal blow, yet miraculously you are alive! You direct blood away from the open wound, dull the pain with your will, and even rearrange your internal organs to keep them away from the injury. Only someone with absolute control over their own body could perform this feat.',
      effect: effects.conditionalOnelineText('When someone makes a Rippling roll against you to cause an Injury or Medical Condition, reduce the number of dice in the roll by two. You may boost this technique to remove one more die per two Chi spent. You can’t reduce the number of dice below one.')
    },
    {
      level: 5,
      name: 'God-Body Transcendence',
      uid: 'God-Body Transcendence',
      description: 'The final technique of the Manual is not taught, but understood. The accumulation of physical and spiritual health has created an immortal divine body that will endure after death on a higher level of existence. It is exhausting to do so, but you can briefly bring forth this higher nature.',
      effect: effects.conditionalText(['Round-long duration. You may spend Chi each round to extend the technique’s duration another round; you must spend the Chi at the beginning of each new round. The first extension costs 1 chi, the second costs 2 chi, the third costs 3 chi, and so on.',
        'Increase your Lake size by 1.'
      ])
    }
  ],
};
