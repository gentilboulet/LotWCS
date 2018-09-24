import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { canBuySkill, canBuySpeciality, getCostSkill, getCostSpeciality } from 'costs/state';
import { ICost } from 'costs/types';
import * as skillActions from 'state/actions/skills';
import { IStoreState } from 'state/types';

import CharacterSkills, { ICharacterSkillsProps, ISkillProps, ISpecialityProps } from 'components/CharacterSkills';

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
        canBuySkill: canBuySkill(state, skill.name),
        cost: getCostSkill(state, skill.name),
        name: skill.name,
        value: skill.value,

        specialities: state.get('skillSpecialities').map( (speciality: ISpecialityProps) => {
          return {
            bought: speciality.bought,
            canBuySpeciality: canBuySpeciality(state, skill.name, speciality.name),
            cost: getCostSpeciality(state, skill.name, speciality.name),
            name: speciality.name
          };
        }),
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
