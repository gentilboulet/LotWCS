import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as actions from "state/actions/virtues";
import { getCostVirtue, ICost } from "state/costs";
import { IStoreState } from "state/type";
import { canBuyVirtue } from "state/virtues";

import Virtues, { IVirtuesProps } from "components/Character/Virtues";
import { IDataVirtueType } from "data/virtues";

interface IMapStateToProps {
  virtues: Array<{
    canBuy: boolean;
    cost: ICost;
    name: string;
    type: IDataVirtueType;
    value: number;
  }>;
}

interface IMapDispatchToProps {
  onBuy: (name: string, cost: ICost) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    virtues: state.virtues.map(v => {
      return {
        canBuy: canBuyVirtue(state, v.name),
        cost: getCostVirtue(state),
        name: v.name,
        type: v.type,
        value: v.value
      };
    })
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<actions.IVirtueAction>
): IMapDispatchToProps {
  return {
    onBuy: (name: string, cost: ICost) =>
      dispatch(actions.increase(name, 1, cost))
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): IVirtuesProps {
  const props: IVirtuesProps = { virtues: [] };

  propsFromState.virtues.forEach(variable => {
    const val = Object.assign({}, variable, {
      onBuy: () => propsForDispatch.onBuy(variable.name, variable.cost)
    });
    props.virtues.push(val);
  });
  return props;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Virtues);
