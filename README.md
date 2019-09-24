# LotWCS

Legends of the Wulin Character Sheet

<p align="center">
    <a href="https://circleci.com/docs/1.0/status-badges/">
        <img src="https://circleci.com/gh/gentilboulet/LotWCS.svg?&style=shield"
             alt="Build Status">
    </a>
    <a href='https://coveralls.io/github/gentilboulet/LotWCS'>
        <img src='https://coveralls.io/repos/github/gentilboulet/LotWCS/badge.svg'
             alt='Coverage Status' />
    </a>
</p>

This app is designed to help players & wulin sage alike to create character sheets for the role-playing game Legends of the Wulin.

Currently, there are no plans to provide a character database to users.
Instead, LotWCS will provide an import/export feature for you to store your characters.

# Technical stuff

Here we will bore you with technical considerations, for developers of LotWCS mainly.

## App Model

This application uses the standard React-Redux pattern.
The whole application relies on a Redux Store to store the character information.
The character evolves from an initial state to the current state through user actions.

The Redux architecture handle state evolutions by applying a list of actions to the current state, returning a new updated state.
Those actions are shown in the history. To provide undo functionality, as state only evolve forward, an history replay feature is available.

The state is used to feed React Components to display the character.
React Components are subdivided by responsibility: container Components are there to link the store to render Components.

## App specifics lingo

### Loresheets

Distinction is made to differentiate secret arts loresheets from standard loresheet.
Standard loresheets can provide sub options.
Secret arts can provides techniques.

### Perks

Loresheets and kungfu can provide perks to the character. Four types of perks are supported currently.

- Bonuses : direct bonuses provided to the character instantaneously on buy of an option
- Discounts : offering targeted discount for certain future purchases
- Effects : "displayed" effect when the provider is selected (for example, benefits from a certain kungfu style)
- AutomaticCondition : trigger to provide automatically some bonuses (for example, secrets arts are provided for free for certain archetypes or for character with a certain skill value)

# State example

## Character state object

### "header"

The "header" part of the character correspond to the following entries :

```typescript
  archetype: 'warrior',
  concept: 'Example',
  name: 'Bob Lee',
  rank: 2,
  destiny: 20,
  entanglement: 0,
```

Rank and Archetype is required to match [data/rank.tsx](https://github.com/gentilboulet/LotWCS/blob/master/src/data/ranks.tsx "data/rank.tsx") and [data/archetypes.tsx](https://github.com/gentilboulet/LotWCS/blob/master/src/data/archetypes.tsx "data/archetypes.tsx")

### history

history is the list of all user actions, starting with an `history/INITIAL_STATE` action to generate a blank state.
Updating the history is the responsibility of a dedicated middleware for the store.

```typescript
  history: [
    {
      type: 'history/INITIAL_STATE'
    },
    {
      type: 'header/SET_RANK',
      payload: {
        rank: 2
      }
    },
    {
      type: 'header/SET_ARCHETYPE',
      payload: {
        archetype: 'warrior'
      }
    },
    {
      type: 'kungfu/OPEN_STYLE',
      payload: {
        uid: 'Blossom Harvest',
        kungfuType: 'KUNGFU_EXTERNAL',
        cost: {
          canPay: true,
          destiny: 0,
          discounts: [
            {
              idx: 1,
              newValue: 0
            }
          ],
          original: 10
        }
      }
    },
    {
      type: 'kungfu/BUY_TECHNIQUE',
      payload: {
        cost: {
          canPay: true,
          destiny: 4,
          original: 4
        },
        kungfuType: 'KUNGFU_EXTERNAL',
        styleUid: 'Blossom Harvest',
        uid: 'Heart-Fire Temper Skill'
      }
    },
    {
      type: 'kungfu/OPEN_STYLE',
      payload: {
        uid: 'Boundless Prosperity Manual',
        kungfuType: 'KUNGFU_INTERNAL',
        cost: {
          canPay: true,
          destiny: 0,
          discounts: [
            {
              idx: 1,
              newValue: 0
            }
          ],
          original: 10
        }
      }
    },
    {
      type: 'loresheet/OPEN',
      payload: {
        cost: {
          canPay: true,
          destiny: 1,
          discounts: [],
          original: 1
        },
        uid: 'tigersanddragons'
      }
    },
    {
      type: 'loresheet/BUY_OPTION',
      payload: {
        cost: {
          canPay: true,
          destiny: 3,
          discounts: [],
          original: 3
        },
        lsUid: 'tigersanddragons',
        uid: 'sensechi'
      }
    },
    {
      type: 'skills/BUY',
      payload: {
        cost: {
          canPay: true,
          destiny: 0,
          discounts: [
            {
              idx: 0,
              newValue: 18
            }
          ],
          original: 2
        },
        name: 'Wu Wei'
      }
    },
    {
      type: 'skills/BUY',
      payload: {
        cost: {
          canPay: true,
          destiny: 0,
          discounts: [
            {
              idx: 0,
              newValue: 16
            }
          ],
          original: 2
        },
        name: 'Survival'
      }
    },
    {
      type: 'skills/BUY',
      payload: {
        cost: {
          canPay: true,
          destiny: 0,
          discounts: [
            {
              idx: 0,
              newValue: 14
            }
          ],
          original: 2
        },
        name: 'Survival'
      }
    },
    {
      type: 'skills/BUY_SPECIALITY',
      payload: {
        cost: {
          canPay: true,
          destiny: 2,
          discounts: [],
          original: 2
        },
        skill: 'Survival',
        speciality: 'At Sea'
      }
    },
    {
      type: 'skills/BUY_SPECIALITY',
      payload: {
        cost: {
          canPay: true,
          destiny: 2,
          discounts: [],
          original: 2
        },
        skill: 'Survival',
        speciality: 'Deserts'
      }
    },
    {
      type: 'skills/BUY',
      payload: {
        cost: {
          canPay: true,
          destiny: 0,
          discounts: [
            {
              idx: 0,
              newValue: 12
            }
          ],
          original: 2
        },
        name: 'Medicine'
      }
    },
    {
      type: 'skills/BUY',
      payload: {
        cost: {
          canPay: true,
          destiny: 0,
          discounts: [
            {
              idx: 0,
              newValue: 10
            }
          ],
          original: 2
        },
        name: 'Hardiness'
      }
    },
    {
      type: 'skills/BUY',
      payload: {
        cost: {
          canPay: true,
          destiny: 0,
          discounts: [
            {
              idx: 0,
              newValue: 8
            }
          ],
          original: 2
        },
        name: 'Hardiness'
      }
    },
    {
      type: 'skills/BUY_SPECIALITY',
      payload: {
        cost: {
          canPay: true,
          destiny: 2,
          discounts: [],
          original: 2
        },
        skill: 'Hardiness',
        speciality: 'Focusing on Breath (for Warriors)'
      }
    }
  ],
```

### chi

Chi is an object where key are associated to an object handling the a chi value and its cultivation value. Chis are generated from [data/chi.tsx](https://github.com/gentilboulet/LotWCS/blob/master/src/data/chi.tsx "data/chi.tsx").

```typescript
  chi: {
    general: {
      value: 11,
      cultivation: 4
    },
    wood: {
      value: 2,
      cultivation: 2
    },
    fire: {
      value: 0,
      cultivation: 0
    },
    earth: {
      value: 0,
      cultivation: 0
    },
    water: {
      value: 0,
      cultivation: 0
    },
    metal: {
      value: 0,
      cultivation: 0
    },
    enlightened: {
      value: 0,
      cultivation: 0
    },
    corrupt: {
      value: 0,
      cultivation: 0
    }
  },
```

### kungfu

kungfu provide three kinds of information : a list of opened external kungfu, a list of opened internal kungfu and a list of unrestricted internal kungfus (meaning a character can buy more than one technique of each level).
KUNGFU_EXTERNAL and KUNGFU_INTERNAL are object where key is the uid of a kungfu style, and the associated value is the list of techniques of the style bought.
noRestrictionInternal is just a list of uids.

```typescript
  kungfu: {
    KUNGFU_EXTERNAL: {
      'Blossom Harvest': [
        'Heart-Fire Temper Skill'
      ]
    },
    KUNGFU_INTERNAL: {
      'Boundless Prosperity Manual': [
        'Retain Balanced Nature',
        'Act Without Resistance'
      ]
    },
    noRestrictionInternal: []
  },
```

### loresheets

loresheets store bought loresheets and their options/techniques.
Same as kungfu, the object key are loresheets uids and contain a list of bought options/techniques. Bought options consists of object `{uid: string, payload?: any}`.

```typescript
  loresheets: {
    tigersanddragons: [
      {
        uid: 'sensechi'
      }
    ]
  },
```

### skills

Value and bought specialities for each skill. Initialised to zero / no speciality with the initial state.

```typescript
  skills: [
    {
      name: 'Awareness',
      specialities: [],
      value: 0
    },
    {
      name: 'Confidence',
      specialities: [],
      value: 0
    },
    {
      name: 'Crafting',
      specialities: [],
      value: 0
    },
    {
      name: 'Finesse',
      specialities: [],
      value: 0
    },
    {
      name: 'Hardiness',
      specialities: [
        'Focusing on Breath (for Warriors)'
      ],
      value: 10
    },
    {
      name: 'Inspire',
      specialities: [],
      value: 0
    },
    {
      name: 'Learning',
      specialities: [],
      value: 0
    },
    {
      name: 'Medicine',
      specialities: [],
      value: 5
    },
    {
      name: 'Might',
      specialities: [],
      value: 0
    },
    {
      name: 'Perform',
      specialities: [],
      value: 0
    },
    {
      name: 'Politics',
      specialities: [],
      value: 0
    },
    {
      name: 'Ride',
      specialities: [],
      value: 0
    },
    {
      name: 'Stealth',
      specialities: [],
      value: 0
    },
    {
      name: 'Survival',
      specialities: [
        'At Sea',
        'Deserts'
      ],
      value: 10
    },
    {
      name: 'Tactics',
      specialities: [],
      value: 0
    },
    {
      name: 'Wu Wei',
      specialities: [],
      value: 5
    }
  ],
```

### virtues

Describe all bought virtues for a character.
Initialized at zero by default for the ten common virtues, some loresheet can add other virtues.

```typescript
  virtues: [
    {
      name: 'Honor',
      value: 0,
      type: 'VIRTUE_CHIVALROUS'
    },
    {
      name: 'Benevolence',
      value: 0,
      type: 'VIRTUE_CHIVALROUS'
    },
    {
      name: 'Righteousness',
      value: 0,
      type: 'VIRTUE_CHIVALROUS'
    },
    {
      name: 'Loyalty',
      value: 0,
      type: 'VIRTUE_CHIVALROUS'
    },
    {
      name: 'Force',
      value: 0,
      type: 'VIRTUE_CHIVALROUS'
    },
    {
      name: 'Revenge',
      value: 0,
      type: 'VIRTUE_SELFISH'
    },
    {
      name: 'Individualism',
      value: 0,
      type: 'VIRTUE_SELFISH'
    },
    {
      name: 'Obsession',
      value: 0,
      type: 'VIRTUE_SELFISH'
    },
    {
      name: 'Ruthlessness',
      value: 0,
      type: 'VIRTUE_SELFISH'
    },
    {
      name: 'Ferocity',
      value: 0,
      type: 'VIRTUE_SELFISH'
    }
  ],
```

### automatics

List of available automatics to be checked by the automatic middleware.
Initialized from loresheet data on character creation.

```typescript
  automatics: [],
```

List of available discounts and their specific configuration.
The same discount may be reused for multiple actions if its value is sufficient.

```typescript
discounts: [
  {
    skills: [
      "Awareness",
      "Confidence",
      "Crafting",
      "Finesse",
      "Hardiness",
      "Inspire",
      "Learning",
      "Medicine",
      "Might",
      "Perform",
      "Politics",
      "Ride",
      "Stealth",
      "Survival",
      "Tactics",
      "Wu Wei"
    ],
    type: "DISCOUNT_SKILL",
    value: 8
  }
];
```
