import CharacterSkills, { ICharacterSkillsProps, ISkillProps, ISpecialityProps } from 'components/CharacterSkills';
import * as skillActions from 'state/actions/skills';
import { IStoreState } from 'state/types';
import { ICost } from 'costs/types';
import { connect, Dispatch } from 'react-redux';
import { getCostSkill, canBuySkill, getCostSpeciality, canBuySpeciality } from 'costs/state';

interface IMapStateToProps {
  skills: ISkillProps[];
}

interface IMapDispatchToProps {
  onSkillBuy: (s: string, cost: ICost) => void;
  onSpecialityBuy: (sk: string, sp: string) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    skills: state.get('skills').map( (skill: ISkillProps) => {
      return {
        name: skill.name,
        value: skill.value,
        specialities: state.get('skillSpecialities').map( (speciality: ISpecialityProps) => {
          return {
            name: speciality.name,
            bought: speciality.bought,
            canBuySpeciality: canBuySpeciality(state, skill.name, speciality.name),
            cost: getCostSpeciality(state, skill.name, speciality.name)
          };
        }),
        canBuySkill: canBuySkill(state, skill.name),
        cost: getCostSkill(state, skill.name),
      };
    }),
  };
}

function mapDispatchToProps(dispatch: Dispatch<skillActions.ISkillAction>): IMapDispatchToProps {
  return {
    onSkillBuy: (skill: string, cost: ICost) => dispatch(skillActions.skillsBuy(skill, cost)),
    onSpecialityBuy: (skill: string, speciality: string) => { return; },
  };
}

function mergeProps(propsFromState: IMapStateToProps,
                    propsForDispatch: IMapDispatchToProps
                  ): ICharacterSkillsProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterSkills);
