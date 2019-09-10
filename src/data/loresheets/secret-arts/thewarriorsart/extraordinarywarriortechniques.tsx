import { IDataSecretArt } from "../../../../data/loresheets";
import { SECRET_ARTS } from "../../types";

/* tslint:disable:max-line-length */
/* tslint:disable:object-literal-sort-keys */

// TODO : grant free lorsheet from conditional status
export const extraordinarywarriortechniques: IDataSecretArt = {
  uid: "extraordinarywarriortechniques",
  type: SECRET_ARTS,
  name: "Extraordinary Warrior Techniques",
  category: "The Warrior's Art",
  cost: 1,
  ruleset: "secret-arts",
  description:
    "These are techniques that flow from an understanding of the Warrior’s Art – though not part of specific Styles, they might be considered Formless Techniques for Externals. They are based on a deeper insight of the lessons of the Five Combat Approaches as applied on the field of battle – being universally applicable, there are almost as many variants and individual expressions of these techniques as there are practitioners.",
  options: [
    {
      uid: "controllinginnerforce",
      cost: 3,
      name: "Controlling Inner Force",
      type: "Flood",
      description:
        "Whether through pressure points, cruel cuts, or a deeper understanding of Wu Wei, the Warrior breaks the equilibrium of their opponent. When you achieve a critical success on a Disorient Marvel, you can Flood a die from your River to increase the penalty to -10",
      prerequisites: [],
      perks: []
    },
    {
      uid: "controllingouterforce",
      cost: 3,
      name: "Controlling Outer Force",
      type: "Flood",
      description:
        "The Style of your opponent flows in an unbroken stream from hard-won lessons to the expression of techniques. Disrupt that stream, and you deny them the tools of combat. When you achieve a critical success on a Disrupt Marvel, you can Flood a die from your River to increase the penalty to -10.",
      prerequisites: [],
      perks: []
    },
    {
      uid: "gardenershapesthesaplingtechnique",
      cost: 5,
      name: "Gardener Shapes the Sapling Technique",
      type: "Extended/Augment",
      description:
        "The Warrior can also be a teacher; their advice serves as a sharp and balanced weapon in their pupil's hands. As the gardener cultivates his plants from seedlings, you shape your students to grow and prosper. You can spend 1 Joss to use a scene of training to confer an Approach to someone else, until the end of the next combat. You and the Sage decide on the details of this particular training, as well as the outlines of the Battle Condition; your pupil can only choose whether to obey their master!",
      prerequisites: [],
      perks: []
    },
    {
      uid: "mirrorreflectiontechnique",
      cost: 3,
      name: "Mirror Reflection Technique",
      type: "Flood",
      description:
        "You not only excel at reading the intricacies of your opponent’s style, but spend long hours training to copy it, unconsciously modeling your Chi to match their movements and shifting your own muscle tension to mimic theirs. Using the conflict itself as your training ground, you assume the hidden strengths of your enemy. After witnessing an opponent in combat and Detecting their chosen Combat Condition with the usual Tactics roll, you can Flood two dice from your River to instantly assume their approach and the associated Combat Condition.",
      prerequisites: [],
      perks: []
    },
    {
      uid: "mirrorreflectiontechnique_2",
      cost: 5,
      name: "Mirror Reflection Technique",
      type: "Flood",
      description:
        "There are whispers of an ultimate form of this technique that allows a Warrior to flow through forms to instinctively assume a superior tactic in response to his enemy. For every action, there is an appropriate reaction, and these legendary warriors have internalized the forms of battle. For an additional 5 Destiny, you learn the ultimate form of this technique: instead of copying your opponent’s form, you assume an approach that controls his! You describe the generalities of the approach, and the Sage determines the details.",
      prerequisites: ["mirrorreflectiontechnique"],
      perks: []
    },
    {
      uid: "qualityevaluationtechnique",
      cost: 3,
      name: "Quality Evaluation Technique",
      type: "Augment",
      description:
        "There exists a multitude of techniques to gauge an opponent’s worthiness and the vital components of their Styles. Some note the development of muscles and ligaments; others read the eyes and their movement. More utilitarian approaches include sneaking a look at their opponents while they train! Whatever your approach, you excel at weighing their strengths and weaknesses. You get +10 to Tactics rolls made to evaluate the qualities of an opponent’s External Style.",
      perks: [],
      prerequisites: []
    },
    {
      uid: "springfollowswintertechnique",
      cost: 5,
      name: "Spring Follows Winter Technique",
      type: "Wave",
      description:
        "Learning when to let go might be the hardest lesson to learn; one way or the other, you’ve mastered it. When others stubbornly refuse to move, you flow and shift. It is in the nature of things to change. Make a Hard (30) Tactics Wave – if this { is } successful, you are allowed to spend 2 Joss to shift your Approach at the end  of this turn. The Difficulty rises to Memorable (40) if you { are } trying to shift to the Approach that Controls your current one.",
      perks: [],
      prerequisites: []
    },
    {
      uid: "stancebreakingforcetechnique",
      cost: 3,
      name: "Stance-Breaking Force technique",
      type: "Augment",
      description:
        "Having internalized the lessons of Five-Element combat theory and the tactical Classics, you easily wield the strengths of your Approach. Increase the bonus to Tactics rolls against an opponent’s approach that your approach Controls to +10.",
      prerequisites: [],
      perks: []
    },
    {
      uid: "tendirectionmovementapproach",
      cost: 2,
      name: "Ten-Direction Movement Approach",
      type: "Flood",
      description:
        "Trap the foot. Close the gate. Block the way. Prevent your opponent from moving as they want, and remove any obstacles to your own path. Mastery of the field is the first step to victory. When you achieve a critical success on a Shaping Marvel, you can Flood to add +5 to the final result per die flooded.",
      perks: [],
      prerequisites: []
    },
    {
      uid: "unassailablebattlesainttechnque",
      cost: 5,
      name: "Unassailable Battle Saint Technique",
      type: "Augment",
      description:
        "You are an enlightened warrior, having reached the deeper secrets of the Five-Element Approach to battle. You can spend 1 Joss when you roll a Critical Success to create a Combat Condition for yourself to make { it } a Major Condition",
      prerequisites: [],
      perks: []
    }
  ]
};
