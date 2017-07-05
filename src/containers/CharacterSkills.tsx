import CharacterSkills, { ICharacterSkillsProps, ISkillProps, ISpecialityProps }
  from '../components/CharacterSkills';
import * as actions from '../actions/skills';
import { IStoreState } from '../types/state';
import { connect, Dispatch } from 'react-redux';

interface IMapStateToProps {
  skills: ISkillProps[];
}

interface IMapDispatchToProps {
  onSkillBuy: (s: string) => void;
  onSpecialityBuy: (sk: string, sp: string) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    skills: state.get('skills').map( (s: ISkillProps) => {
      return {
        name: s.name,
        value: s.value,
        specialities: s.specialities.map( (spe: ISpecialityProps) => {
          return { name: spe.name, bought: spe.bought };
        }),
      };
    }),
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.ISkillAction>): IMapDispatchToProps {
  return {
    onSkillBuy: (skill: string) => dispatch(actions.skillsDoStuff(skill)),
    onSpecialityBuy: (skill: string, speciality: string) => dispatch(actions.skillsDoStuff(skill + speciality)),
  };
}

function mergeProps(mapStateToProps: IMapStateToProps,
                    mapDispatchToProps: IMapDispatchToProps
                  ): ICharacterSkillsProps {
  return Object.assign(mapStateToProps, mapDispatchToProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterSkills);
