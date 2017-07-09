import CharacterSkills, { ICharacterSkillsProps, ISkillProps, ISpecialityProps }
  from '../components/CharacterSkills';
import * as actions from '../actions/skills';
import { IStoreState } from '../types/state';
import { ICost } from '../types/costs';
import { connect, Dispatch } from 'react-redux';
import { getCostSkill, canBuySkill } from './costs';

interface IMapStateToProps {
  skills: ISkillProps[];
}

interface IMapDispatchToProps {
  onSkillBuy: (s: string, cost: ICost) => void;
  onSpecialityBuy: (sk: string, sp: string) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    skills: state.get('skills').map( (s: ISkillProps) => {
      return {
        name: s.name,
        value: s.value,
        specialities: s.specialities.map( (spe: ISpecialityProps) => {
          return { name: spe.name, bought: spe.bought, canBuySpeciality: false };
        }),
        canBuySkill: canBuySkill(state, s.name),
        cost: getCostSkill(state, s.name),
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

/* tslint:disable:no-console */
function mergeProps(mapStateToProps: IMapStateToProps,
                    mapDispatchToProps: IMapDispatchToProps
                  ): ICharacterSkillsProps {
  console.log(mapStateToProps);
  return Object.assign(mapStateToProps, mapDispatchToProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterSkills);
