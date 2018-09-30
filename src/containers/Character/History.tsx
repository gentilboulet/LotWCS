import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import History, { IHistoryProps } from 'components/Character/History';

import * as actions from 'state/actions/history';
import { IAction } from 'state/actions/types';
import { IStoreState } from 'state/type';

interface IMapStateToProps {
  history: IAction[];
}

interface IMapDispatchToProps {
  onDelete: (id: number) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return { history: state.history };
}

function mapDispatchToProps(dispatch: Dispatch<actions.IHistoryAction>): IMapDispatchToProps {
  return { onDelete: (id: number) => {
    dispatch(actions.historyDeleteUpTo(id));
  }};
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): IHistoryProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(History);
