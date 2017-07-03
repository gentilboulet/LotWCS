import CharacterSkills from '../components/CharacterSkills';
import * as actions from '../actions/skills';
import { IStoreState } from '../types/state';
import { connect, Dispatch } from 'react-redux';

interface ISpecialityToProps {
  name: string;
  bought: boolean;
}

interface ISkillToProps {
  name: string;
  value: number;
  specialities: ISpecialityToProps[];
}

interface ImapStateToProps {
  skills: ISkillToProps[];
}

interface ImapDispatchToProps {
  onSkillBuy: (s: string) => void;
  onSpecialityBuy: (sk: string, sp: string) => void;
}

function mapStateToProps(state: IStoreState): ImapStateToProps {
  return { skills: state.get('skills').map(
    (skill: ISkillToProps) => { return {
      name: skill.name,
      value: skill.value,
      specialities: skill.specialities,
    }; })};
}

function mapDispatchToProps(dispatch: Dispatch<actions.ISkillAction>): ImapDispatchToProps {
  return {
    onSkillBuy: (skill: string) => dispatch(actions.skillsDoStuff(skill)),
    onSpecialityBuy: (skill: string, speciality: string) => dispatch(actions.skillsDoStuff(skill + speciality)),
  };
}

function mergeProps(mapStateToProps: ImapStateToProps,
                    mapDispatchToProps: ImapDispatchToProps) {
  return Object.assign(mapStateToProps, mapDispatchToProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterSkills);
