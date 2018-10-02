import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getCostOpenLoresheet, ICost } from 'state/costs';

import { ILoresheetAction, open } from 'state/actions/loresheets'
import { canBuyLoresheet, isLoresheetPresent } from 'state/loresheets';
import { IStoreState } from 'state/type';

import Loresheet, { ILoresheetProps } from 'components/Character/Loresheet';

interface IMapStateToProps {
  uid: string;
  known: boolean;
  canBuy: boolean;
  cost: ICost;
  knownOptions: Array<{ uid: string, payload?: any }>;
}

interface IMapDispatchToProps {
  onBuy: (cost: ICost) => void;
}

interface IProps {
  uid: string;
}

function mapStateToProps(state: IStoreState, props: IProps): IMapStateToProps {
  const loresheetUid = Object.keys(state.loresheets).find((ls) => ls === props.uid);
  const options = (loresheetUid !== undefined) ? state.loresheets[loresheetUid] : [];
  return {
  	canBuy: canBuyLoresheet(state, props.uid),
  	cost: getCostOpenLoresheet(state, props.uid),
  	known: isLoresheetPresent(state.loresheets, props.uid),
    knownOptions: options,
  	uid: props.uid,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ILoresheetAction>, props: IProps): IMapDispatchToProps {
  return {
    onBuy: (cost: ICost) => dispatch(open(props.uid, cost)),
  };
}

function mergeProps(propsFromState: IMapStateToProps,
                    propsForDispatch: IMapDispatchToProps): ILoresheetProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Loresheet);
