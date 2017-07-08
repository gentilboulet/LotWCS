import CharacterSkills, { ICharacterSkillsProps, ISkillProps, ISpecialityProps }
  from '../components/CharacterSkills';
import * as actions from '../actions/skills';
import { IStoreState } from '../types/state';
import { ICost } from '../types/costs';
import { connect, Dispatch } from 'react-redux';
import { getCostSkill } from './costs';

interface IMapStateToProps {
  skills: ISkillProps[];
}

interface IMapDispatchToProps {
  onSkillBuy: (s: string, cost: ICost) => void;
  onSpecialityBuy: (sk: string, sp: string) => void;
}

/* tslint:disable:no-console */
function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    skills: state.get('skills').map( (s: ISkillProps) => {
      return {
        name: s.name,
        value: s.value,
        specialities: s.specialities.map( (spe: ISpecialityProps) => {
          return { name: spe.name, bought: spe.bought };
        }),
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

function mergeProps(mapStateToProps: IMapStateToProps,
                    mapDispatchToProps: IMapDispatchToProps
                  ): ICharacterSkillsProps {
  return Object.assign(mapStateToProps, mapDispatchToProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterSkills);
