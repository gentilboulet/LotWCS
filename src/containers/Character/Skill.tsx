import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { IStoreState } from "../../state";
import * as actions from "../../state/character/actions/skills";
import { getCostSkill, ICost } from "../../state/character/models/costs";
import { canBuySkill, getSkill } from "../../state/character/models/skills";

import { TSkillName } from "../../data/skills";

import Skill, { ISkillProps } from "../../components/Character/Skill";

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
  onBuy: (cost: ICost) => void;
}

function mapStateToProps(state: IStoreState, props: IProps): IMapStateToProps {
  return {
    canBuy: canBuySkill(state.character, props.name),
    cost: getCostSkill(state.character, props.name),
    name: props.name,
    value: getSkill(state.character, props.name).value
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>,
  props: IProps
): IMapDispatchToProps {
  return {
    onBuy: (cost: ICost) => {
      dispatch(actions.skillsBuy(props.name, cost));
    }
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): ISkillProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Skill);
