export interface IDataArchetype {
  name: string;
  description: string;
  key: string;
  breath: string;
}

export type IDataArchetypes = IDataArchetype[];

/* tslint:disable:max-line-length */
export const archetypes: IDataArchetypes = [
  {
    breath: 'Hardiness',
    description: 'Warriors are by far the most common of the five archetypes. Although all people within the martial arts society are good at fighting, it is the warriors who truly embrace it as their way of life. They are the swordsmen and pugilists, constables and assassins, as well as the most iconic heroes and villains.',
    key: 'warrior',
    name: 'Warrior',
  }, {
    breath: 'WuWei',
    description: 'Despite the name, they are not simple religious administrators; they are the Daoists, wise men and women whose approach to fighting starts with Chi cultivation first and foremost. In a world where inner power is of utmost importance, priests are widely respected.',
    key: 'priest',
    name: 'Priest',
  }, {
    breath: 'Confidence',
    description: 'Courtiers wield power not just over themselves but also over others. They are the rulers, merchants, envoys and entertainers that shape society and its people. In a subtle way they are the most powerful of all people; a general may win a war but it’s his king who decides whether there is war at all.',
    key: 'courtier',
    name: 'Courtier',
  }, {
    breath: 'Learning',
    description: 'Scholars are the educated masters, the lore keepers, inventors and advisors. With their knowledge about the workings of the world they perceive events like few others do. Scholars are often found debating how best to rule an empire, hunting for long-lost manuals written in Sanskrit or studying things from exotic foreign lands.',
    key: 'scholar',
    name: 'Scholar',
  }, {
    breath: 'Medicine',
    description: 'Doctors are the least prominent of all five archetypes. Although the medical profession is by no means unheard of, relatively few of them involve themselves in the martial arts realm. Those that do have the potential to become greatly respected allies and feared enemies, literally masters over life and death.',
    key: 'doctor',
    name: 'Doctor',
  }
];

export function validateArchetype(archetype: string): void {
  const foundArchetype = archetypes.find((dataArchetype: IDataArchetype) => (dataArchetype.key === archetype) );
  if (! foundArchetype ) { throw new Error('Invalid archetype "' + archetype + '"'); }
}
