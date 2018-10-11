import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IKungFuAction, openStyle } from 'state/actions/kungfu';
import { getCostKungFuStyle, ICost } from 'state/costs';
import { canOpenKungFu, isStylePresent } from 'state/kungfu';
import { IStoreState } from 'state/type';

import ExternalKungFu, { IExternalKungFuProps } from 'components/Character/ExternalKungFu';

import { KUNGFU_EXTERNAL } from 'data/kungfu/types';

interface IProps {
  uid: string;
}

interface IMapStateToProps {
  canOpen: boolean;
  isOpen: boolean;
  knownTechniques: string[];
  uid: string;
  cost: ICost;
}

interface IMapDispatchToProps {
  onOpen: (cost: ICost) => void;
}

function mapStateToProps(state: IStoreState, props: IProps): IMapStateToProps {
  const isOpen = isStylePresent(state.kungfu,  KUNGFU_EXTERNAL, props.uid);
  return {
    canOpen: canOpenKungFu(state, KUNGFU_EXTERNAL, props.uid),
    cost: getCostKungFuStyle(state, KUNGFU_EXTERNAL, props.uid),
    isOpen,
    knownTechniques: (isOpen ? state.kungfu[KUNGFU_EXTERNAL][props.uid] : []),
    uid: props.uid,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IKungFuAction>, props: IProps):IMapDispatchToProps {
  return {
    onOpen: (cost: ICost) => dispatch(openStyle(props.uid, KUNGFU_EXTERNAL, cost)),
  };
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): IExternalKungFuProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExternalKungFu);
