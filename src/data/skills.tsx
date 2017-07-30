export interface IDataSkill {
  name: string;
  specialities: string[];
}

export interface IDataSkills extends Array<IDataSkill> {}

export const skills: IDataSkills = [
  {
    name: 'Awareness',
    specialities: ['Hear', 'See', 'Smell', 'Taste', 'Touch']
 }, {
   name: 'Confidence',
   specialities: ['Appear steadfast', 'Focus on Breath (for Courtiers)', 'Recover from the Disorient Marvel',
   'Resist Courtier’s Arts']
 }, {
   name: 'Crafting',
   specialities: ['Armor', 'Buildings', 'Cloth', 'Cooking', 'Gardening', 'Painting', 'Tools', 'Weapons']
 }, {
   name: 'Finesse',
   specialities: ['Acrobatics', 'Cheating', 'Escaping Bonds', 'Picking Pockets', 'Sleight of Hand']
 }, {
   name: 'Hardiness',
   specialities: ['Disease', 'Focusing on Breath (for Warriors)', 'Poison', 'Recovering From Injuries',
  'Staying Awake', 'Enduring Torture']
 }, {
   name: 'Inspire',
   specialities: ['Debating', 'Intimidation', 'Outright Lies', 'Public Speeches',
  'Specific Courtier’s Arts techniques', 'Spinning the Facts']
 }, {
   name: 'Learning',
   specialities: ['Calligraphy', 'Focus on Breath (for Scholars)', 'History',
  'Math', 'Other Cultures', 'Philosophy', 'Specific Scholar’s Arts Techniques']
 }, {
   name: 'Medicine',
   specialities: ['Disease', 'Focus on Breath (for Doctors)', 'Injuries',
  'Poison', 'Pressure Points', 'Specific Doctor’s Arts Techniques']
 }, {
   name: 'Might',
   specialities: ['Breaking', 'Lifting', 'Pushing', 'Throwing']
 }, {
   name: 'Perform',
   specialities: ['Acting', 'Ceremonial Performances', 'Dancing',
   'Poetry', 'Singing', 'Music']
 }, {
   name: 'Politics',
   specialities: ['Specific region or faction']
 }, {
   name: 'Ride',
   specialities: ['Caring for Your Horse', 'Coaxing Your Horse into Dangerous Terrain', 'Racing']
 }, {
   name: 'Stealth',
   specialities: ['Camouflage', 'Deception', 'Eavesdropping', 'In Shadows',
   'Silence', 'Smuggling']
}, {
  name: 'Survival',
  specialities: ['At Sea', 'Cities', 'Deserts', 'Forests', 'Mountains', 'Prisons']
}, {
  name: 'Tactics',
  specialities: ['Battlefield Analysis', 'Disruption', 'Escorting Caravans', 'Sieging Fortresses',
  'Specific Warrior’s Arts Techniques']
}, {
  name: 'Wu Wei',
  specialities: ['Focusing on Breath (for Priests)', 'Resisting Curses', 'Sensing Chi',
  'Social Perception', 'Specific Priest’s Arts Techniques']
}
];
