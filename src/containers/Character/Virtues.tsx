import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { IStoreState } from "../../state";
import * as actions from "../../state/actions/character/virtues";
import { getCostVirtue, ICost } from "../../state/models/character/costs";
import { canBuyVirtue } from "../../state/models/character/virtues";

import Virtues, { IVirtuesProps } from "../../components/Character/Virtues";
import { IDataVirtueType } from "../../data/virtues";

interface IMapStateToProps {
  virtues: {
    canBuy: boolean;
    cost: ICost;
    name: string;
    type: IDataVirtueType;
    value: number;
  }[];
}

interface IMapDispatchToProps {
  onBuy: (name: string, cost: ICost) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    virtues: state.character.virtues.map(v => {
      return {
        canBuy: canBuyVirtue(state.character, v.name),
        cost: getCostVirtue(state.character, v.name, v.type),
        name: v.name,
        type: v.type,
        value: v.value,
      };
    }),
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<ActionType<typeof actions>>,
): IMapDispatchToProps {
  return {
    onBuy: (name: string, cost: ICost) =>
      dispatch(actions.increase(name, 1, cost)),
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps,
): IVirtuesProps {
  const props: IVirtuesProps = { virtues: [] };

  propsFromState.virtues.forEach(variable => {
    const val = Object.assign({}, variable, {
      onBuy: () => propsForDispatch.onBuy(variable.name, variable.cost),
    });
    props.virtues.push(val);
  });
  return props;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Virtues);
