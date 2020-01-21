import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "../../state/actions/chi";
import { canBuyChi } from "../../state/chi";
import { getCostChi, ICost } from "../../state/costs";
import { ICharacterState } from "../../state/type";

import Chi, { IChiProps } from "../../components/Character/Chi";
import { TChiName } from "../../data/chi";

interface IMapStateToProps {
  canBuy: boolean;
  cost: ICost;
  cultivation: number;
  name: TChiName;
  value: number;
}

interface IMapDispatchToProps {
  onBuy: (cost: ICost) => void;
}

interface IProps {
  name: TChiName;
}

function mapStateToProps(state: ICharacterState, props: IProps): IMapStateToProps {
  return {
    canBuy: canBuyChi(/*state, props.name*/),
    cost: getCostChi(state, props.name),
    cultivation: state.chi[props.name].cultivation,
    name: props.name,
    value: state.chi[props.name].value
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>,
  props: IProps
): IMapDispatchToProps {
  return {
    onBuy: (cost: ICost) => dispatch(actions.chiBuy(props.name, 1, cost))
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): IChiProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Chi);
