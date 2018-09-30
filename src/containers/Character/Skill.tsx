import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as actions from 'state/actions/skills';
import { getCostSkill, ICost } from 'state/costs';
import { canBuySkill } from 'state/skills';
import { IStoreState } from 'state/type';

import { TSkillName } from 'data/skills';

import Skill, { ISkillProps } from 'components/Character/Skill';

interface IMapStateToProps {
  canBuy: boolean;
  cost: ICost;
  name: TSkillName;
  value: number;
}

interface IProps {
  name: TSkillName;
}

interface IMapDispatchToProps {
  onBuy: (skill: TSkillName, cost: ICost) => void;
}

function mapStateToProps(state: IStoreState, props: IProps): IMapStateToProps {
  return {
    canBuy: canBuySkill(state, props.name),
    cost: getCostSkill(state, props.name),
    name: props.name,
    value: state.skills[props.name].value
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.ISkillAction>): IMapDispatchToProps {
  return {
    onBuy: (skill: TSkillName, cost: ICost) => {

      dispatch(actions.skillsBuy(skill, cost))
    }
  };
}

function mergeProps(propsFromState: IMapStateToProps,
                    propsForDispatch: IMapDispatchToProps
                  ): ISkillProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Skill);
