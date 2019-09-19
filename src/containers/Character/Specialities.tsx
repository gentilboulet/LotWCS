import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "../../state/actions/skills";
import { getCostSpeciality, ICost } from "../../state/costs";
import { canBuySpeciality } from "../../state/skills";
import { IStoreState } from "../../state/type";

import { skills as data, TSkillName } from "../../data/skills";

import Specialities, {
  ISpecialitiesProps
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
    canBuy: canBuySpeciality(state, props.skill, ""),
    cost: getCostSpeciality(state),
    name: ""
  };

  const concat = data[props.skill].specialities.concat(
    state.skills[props.skill].specialities
  );
  const merge = concat
    .filter((item, pos) => concat.indexOf(item) === pos)
    .sort();

  const retVal = {
    bought: state.skills[props.skill].specialities,
    specialities: merge.map((speciality: string) => {
      return {
        canBuy: canBuySpeciality(state, props.skill, speciality),
        cost: getCostSpeciality(state),
        name: speciality
      };
    })
  };
  retVal.specialities.push(newSpecialityAvailability);
  return retVal;
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>,
  props: IProps
): IMapDispatchToProps {
  return {
    onBuy: (speciality: string, cost: ICost) => {
      dispatch(actions.skillSpecialityBuy(props.skill, speciality, cost));
    }
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): ISpecialitiesProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Specialities);
