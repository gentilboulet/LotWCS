export type TSkillName =
  | "Awareness"
  | "Confidence"
  | "Crafting"
  | "Finesse"
  | "Hardiness"
  | "Inspire"
  | "Learning"
  | "Medicine"
  | "Might"
  | "Perform"
  | "Politics"
  | "Ride"
  | "Stealth"
  | "Survival"
  | "Tactics"
  | "Wu Wei";

export type TDataSkills = { [key in TSkillName]: string[] };

export const skills: TDataSkills = {
  Awareness: ["Hear", "See", "Smell", "Taste", "Touch"],
  Confidence: [
    "Appear steadfast",
    "Focus on Breath (for Courtiers)",
    "Recover from the Disorient Marvel",
    "Resist Courtier’s Arts"
  ],
  Crafting: [
    "Armor",
    "Buildings",
    "Cloth",
    "Cooking",
    "Gardening",
    "Painting",
    "Tools",
    "Weapons"
  ],
  Finesse: [
    "Acrobatics",
    "Cheating",
    "Escaping Bonds",
    "Picking Pockets",
    "Sleight of Hand"
  ],
  Hardiness: [
    "Disease",
    "Focusing on Breath (for Warriors)",
    "Poison",
    "Recovering From Injuries",
    "Staying Awake",
    "Enduring Torture"
  ],
  Inspire: [
    "Debating",
    "Intimidation",
    "Outright Lies",
    "Public Speeches",
    "Specific Courtier’s Arts techniques",
    "Spinning the Facts"
  ],
  Learning: [
    "Calligraphy",
    "Focus on Breath (for Scholars)",
    "History",
    "Math",
    "Other Cultures",
    "Philosophy",
    "Specific Scholar’s Arts Techniques"
  ],
  Medicine: [
    "Disease",
    "Focus on Breath (for Doctors)",
    "Injuries",
    "Poison",
    "Pressure Points",
    "Specific Doctor’s Arts Techniques"
  ],
  Might: ["Breaking", "Lifting", "Pushing", "Throwing"],
  Perform: [
    "Acting",
    "Ceremonial Performances",
    "Dancing",
    "Poetry",
    "Singing",
    "Music"
  ],
  Politics: ["Specific region or faction"],
  Ride: [
    "Caring for Your Horse",
    "Coaxing Your Horse into Dangerous Terrain",
    "Racing"
  ],
  Stealth: [
    "Camouflage",
    "Deception",
    "Eavesdropping",
    "In Shadows",
    "Silence",
    "Smuggling"
  ],
  Survival: ["At Sea", "Cities", "Deserts", "Forests", "Mountains", "Prisons"],
  Tactics: [
    "Battlefield Analysis",
    "Disruption",
    "Escorting Caravans",
    "Sieging Fortresses",
    "Specific Warrior’s Arts Techniques"
  ],
  "Wu Wei": [
    "Focusing on Breath (for Priests)",
    "Resisting Curses",
    "Sensing Chi",
    "Social Perception",
    "Specific Priest’s Arts Techniques"
  ]
};
