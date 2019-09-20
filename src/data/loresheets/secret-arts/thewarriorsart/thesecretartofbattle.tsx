import { IDataSecretArt } from "../../../../data/loresheets";
import * as automatics from "../../../../perks/actions/automatics";
import * as bonuses from "../../../../perks/actions/bonuses";
import { SECRET_ARTS } from "../../types";

/* tslint:disable:max-line-length */
/* tslint:disable:object-literal-sort-keys */

export const secretartofbattle: IDataSecretArt = {
  uid: "secretartofbattle",
  type: SECRET_ARTS,
  name: "The Secret Art of Battle",
  category: "The Warrior's Art",
  cost: 10,
  ruleset: "secret-arts",
  description: "Discovery/Toolset/Manipulation Lore (The Warrior's Art).",
  options: [],
  perks: [
    automatics.conditionalOnArchetype("warrior", [
      bonuses.bonusLoresheet("secretartofbattle")
    ])
  ]
};
