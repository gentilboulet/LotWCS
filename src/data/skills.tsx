export type TSkillName = 'Awareness' | 'Confidence' | 'Crafting' | 'Finesse' | 'Hardiness' | 'Inspire' | 'Learning' | 'Medicine' | 'Might' | 'Perform' | 'Politics' | 'Ride' | 'Stealth' | 'Survival' | 'Tactics' | 'Wu Wei';

interface IDataSkill {
  name: string;
  specialities: string[];
}

export type TDataSkills = {
  [key in TSkillName]: IDataSkill;
}

export const skills: TDataSkills = {
  Awareness: {
    name: 'Awareness',
    specialities: ['Hear', 'See', 'Smell', 'Taste', 'Touch']
 },
 Confidence: {
   name: 'Confidence',
   specialities: ['Appear steadfast', 'Focus on Breath (for Courtiers)', 'Recover from the Disorient Marvel',
   'Resist Courtier’s Arts']
 },
 Crafting: {
   name: 'Crafting',
   specialities: ['Armor', 'Buildings', 'Cloth', 'Cooking', 'Gardening', 'Painting', 'Tools', 'Weapons']
 },
 Finesse: {
   name: 'Finesse',
   specialities: ['Acrobatics', 'Cheating', 'Escaping Bonds', 'Picking Pockets', 'Sleight of Hand']
 },
 Hardiness: {
   name: 'Hardiness',
   specialities: ['Disease', 'Focusing on Breath (for Warriors)', 'Poison', 'Recovering From Injuries',
  'Staying Awake', 'Enduring Torture']
 },
 Inspire: {
   name: 'Inspire',
   specialities: ['Debating', 'Intimidation', 'Outright Lies', 'Public Speeches',
  'Specific Courtier’s Arts techniques', 'Spinning the Facts']
 },
 Learning: {
   name: 'Learning',
   specialities: ['Calligraphy', 'Focus on Breath (for Scholars)', 'History',
  'Math', 'Other Cultures', 'Philosophy', 'Specific Scholar’s Arts Techniques']
 },
 Medicine: {
   name: 'Medicine',
   specialities: ['Disease', 'Focus on Breath (for Doctors)', 'Injuries',
  'Poison', 'Pressure Points', 'Specific Doctor’s Arts Techniques']
 },
 Might: {
   name: 'Might',
   specialities: ['Breaking', 'Lifting', 'Pushing', 'Throwing']
 },
 Perform: {
   name: 'Perform',
   specialities: ['Acting', 'Ceremonial Performances', 'Dancing',
   'Poetry', 'Singing', 'Music']
 },
 Politics: {
   name: 'Politics',
   specialities: ['Specific region or faction']
 },
 Ride: {
   name: 'Ride',
   specialities: ['Caring for Your Horse', 'Coaxing Your Horse into Dangerous Terrain', 'Racing']
 },
 Stealth: {
   name: 'Stealth',
   specialities: ['Camouflage', 'Deception', 'Eavesdropping', 'In Shadows',
   'Silence', 'Smuggling']
},
Survival: {
  name: 'Survival',
  specialities: ['At Sea', 'Cities', 'Deserts', 'Forests', 'Mountains', 'Prisons']
},
Tactics: {
  name: 'Tactics',
  specialities: ['Battlefield Analysis', 'Disruption', 'Escorting Caravans', 'Sieging Fortresses',
  'Specific Warrior’s Arts Techniques']
},
'Wu Wei': {
  name: 'Wu Wei',
  specialities: ['Focusing on Breath (for Priests)', 'Resisting Curses', 'Sensing Chi',
  'Social Perception', 'Specific Priest’s Arts Techniques']
}
};
