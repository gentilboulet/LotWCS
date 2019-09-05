import * as effects from "../../../state/actions/perks/effects";
import { IDataInternalKungfu } from "../types";

/* tslint:disable:max-line-length */
/* tslint:disable:object-literal-sort-keys */

export const fireSutra: IDataInternalKungfu = {
  name: "Fire Sutra",
  uid: "Fire Sutra",
  description:
    "Few forces in the world are as primal and respected as fire, so it is no wonder that this sutra was a common art even in ancient days, particularly in the west where the sutras are thought to have been first written. Through meditation and purification, the student learns how to excite his own yang energy to the point of ignition.",
  element: "fire",
  techniques: [
    {
      level: 1,
      name: "Thought of Flame",
      uid: "Thought of Flame",
      description:
        "The most basic of techniques; once mastered, it is as easy and natural as exhalation. Internal power is gathered and expelled as yang-aspected energy.",
      effect: effects.conditionalOnelineText(
        "You can use the Burn effect as a Minor Action on your attack with a +5 bonus."
      )
    },
    {
      level: 2,
      name: "Breath of Buddha",
      uid: "Breath of Buddha",
      description:
        "You expel your internal power directly in to your opponent. Normally, a transfer of inner power is used to heal, but your raging energy heats and dehydrates their body.",
      effect: effects.conditionalText([
        "If your strike hits, and the target has purified Earth, Metal or Water chi, he doesn’t recspire any spent Chi points of those types at the end of this round.",
        "You have a +5 bonus to any Disrupt or Disorient Marvel that narratively uses heat or dehydration."
      ])
    },
    {
      level: 2,
      name: "Fire to Heaven Ascension",
      uid: "Fire to Heaven Ascension",
      description:
        "It is the nature of fire to grow tall and turn away from the earth. Following this example, you transform your energy and achieve similar properties.",
      effect: effects.conditionalOnelineText(
        "You have a +15 bonus to your Footwork when rolling to ascend, such as by jumping or running upwards."
      )
    },
    {
      level: 2,
      name: "Fusing Flames",
      uid: "Fusing Flames",
      description:
        "Bring a flame close to fuel and it will scorch or ignite, but bring two flames together and they only merge into a greater whole. Flame cannot burn flame. Instead of expelling your yang-energy, you keep it close to the surface, so that flames leave you unharmed.",
      effect: effects.conditionalText([
        "Round-long duration.",
        "You have a +10 bonus to your Chi Aura when rolling to protect against Burn damage.",
        "If one or more fighters other than you within your zone use any points of Fire Chi, you regain one additional point of normal Chi at the end of this round. You can gain only a single point this way, regardless of how many people use Fire Chi or how much they use."
      ])
    },
    {
      level: 2,
      name: "Verse of Fire",
      uid: "Verse of Fire",
      description:
        "A few simple words instruct the student on key points in their body to flow their internal energy through, and in what order. It’s easy to learn, but the effects are spectacular: intensely hot fire!",
      effect: effects.conditionalOnelineText(
        "You can use the Burn effect as a Minor Action on your attack with a +10 bonus"
      )
    },
    {
      level: 3,
      name: "Elusive Desert Being",
      uid: "Elusive Desert Being",
      description:
        "The texts speak of gods and ghosts that dwell in hot and distant places. A holy man once traveled far to seek these beings out, and he impressed them with his enlightenment. They rewarded him with their secrets, which he wrote down in this sutra. It speaks of foreign monsters made of smokeless fire, their cunning trickery, and their mirages.",
      effect: effects.conditionalText([
        "You must activate this technique while rolling initiative, and it lasts for the entire round.",
        "You have a +10 bonus to your Speed and Footwork.",
        "If you Dodge an attack, your opponent can negate this technique’s bonus to your roll by including a Hard (30) Awareness check as a minor action on his attack roll. You may boost this technique to increase the difficulty by one step per point of Chi spent."
      ])
    },
    {
      level: 3,
      name: "Mantra of Immolation",
      uid: "Mantra of Immolation",
      description:
        "A profound phrase teaches a transformation of inner power to create fire so hot that it can melt iron.",
      effect: effects.conditionalOnelineText(
        "You can use the Burn effect as a Minor Action on your attack with a +15 bonus. If it forces an immediate Rippling roll, the roll receives a +5 bonus."
      )
    },
    {
      level: 3,
      name: "Nine-Fire Seal",
      uid: "Nine-Fire Seal",
      description:
        "Power coruscates through your body, flooding your chakra and bringing your nature closer to that of a wildfire than that of a mere man.",
      effect: effects.conditionalText([
        "Round-long duration.",
        "You have a +20 bonus to your Chi Aura when rolling to protect against Burn or Freeze damage.",
        "If you used this technique last round as well, you have a +5 bonus to your Strike this round."
      ])
    },
    {
      level: 4,
      name: "Aura of the Qilin",
      uid: "Aura of the Qilin",
      description:
        "The mythical Qilin symbolizes prosperity and wisdom, but its ability to surround itself in flames is more practical to you. You may not have seen such a beast yourself, but the sutras describe how to mimic this trick.",
      effect: effects.conditionalText([
        "Round-long duration.",
        "You have a +30 bonus to your Chi Aura when rolling to protect against Burn or Freeze damage.",
        "If you score a critical success on a Dodge roll, you may Reply against your opponent and inflict one Ripple."
      ])
    },
    {
      level: 4,
      name: "The Sun Scripture",
      uid: "The Sun Scripture",
      description:
        "The sun is a heavenly fire of such strength that it can’t reside on the earth. Your yang-energy approaches divine nature: you can create fire more brilliant than any torch, hearth, or forge.",
      effect: effects.conditionalOnelineText(
        "You can use the Burn effect as a Minor Action on your attack with a +20 bonus. If it forces an immediate Rippling roll, the roll receives a +10 bonus."
      )
    },
    {
      level: 5,
      name: "Prayer of Cosmic Rebirth",
      uid: "Prayer of Cosmic Rebirth",
      description:
        "Religious texts describe the death and resurrection of the universe. A cleansing fire will consume all material existence, and so purge impurities. With a display of utmost skill and benevolence, you call upon the brightest fire that resides within the human spirit to free a life from its current, unclean incarnation.",
      effect: effects.conditionalOnelineText(
        "You can use the Burn effect as a Minor Action on your attack with a +20 bonus. If it forces an immediate Rippling roll, the roll receives a +15 bonus; any Chi Aura used to protect against this damage costs 2 Chi points per die to purchase."
      )
    }
  ]
};
