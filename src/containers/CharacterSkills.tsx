import CharacterSkills, { ICharacterSkillsProps, ISkillProps, ISpecialityProps }
  from '../components/CharacterSkills';
import * as actions from '../actions/skills';
import { IStoreState } from '../types/state';
import { ICost } from '../types/costs';
import { connect, Dispatch } from 'react-redux';
import { getCostSkill, canBuySkill, getCostSpeciality, canBuySpeciality } from './costs';

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
        specialities: skill.specialities.map( (speciality: ISpecialityProps) => {
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

function mapDispatchToProps(dispatch: Dispatch<actions.ISkillAction>): IMapDispatchToProps {
  return {
    onSkillBuy: (skill: string, cost: ICost) => dispatch(actions.skillsBuy(skill, cost)),
    onSpecialityBuy: (skill: string, speciality: string) => dispatch(actions.skillsDoStuff(skill + speciality)),
  };
}

function mergeProps(propsFromState: IMapStateToProps,
                    propsForDispatch: IMapDispatchToProps
                  ): ICharacterSkillsProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterSkills);
