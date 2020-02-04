import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { IStoreState } from "../../state";
import * as actions from "../../state/actions/character/skills";
import { getCostSpeciality, ICost } from "../../state/models/character/costs";
import {
  canBuySpeciality,
  getSkill,
} from "../../state/models/character/skills";

import { skills as data, TSkillName } from "../../data/skills";

import Specialities, {
  ISpecialitiesProps,
} from "../../components/Character/Specialities";

interface IMapStateToProps {
  bought: string[];
  specialities: Array<{
    name: string;
    canBuy: boolean;
    cost: ICost;
  }>;
}

interface IProps {
  skill: TSkillName;
}

interface IMapDispatchToProps {
  onBuy: (speciality: string, cost: ICost) => void;
}

function mapStateToProps(state: IStoreState, props: IProps): IMapStateToProps {
  const newSpecialityAvailability = {
    canBuy: canBuySpeciality(state.character, props.skill, ""),
    cost: getCostSpeciality(state.character),
    name: "",
  };

  const concat = data[props.skill].concat(
    getSkill(state.character.skills, props.skill).specialities,
  );
  const merge = concat
    .filter((item, pos) => concat.indexOf(item) === pos)
    .sort();

  const retVal = {
    bought: getSkill(state.character.skills, props.skill).specialities,
    specialities: merge.map((speciality: string) => {
      return {
        canBuy: canBuySpeciality(state.character, props.skill, speciality),
        cost: getCostSpeciality(state.character),
        name: speciality,
      };
    }),
  };
  retVal.specialities.push(newSpecialityAvailability);
  return retVal;
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>,
  props: IProps,
): IMapDispatchToProps {
  return {
    onBuy: (speciality: string, cost: ICost) => {
      dispatch(actions.skillSpecialityBuy(props.skill, speciality, cost));
    },
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps,
): ISpecialitiesProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Specialities);
