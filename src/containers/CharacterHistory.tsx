import { connect, Dispatch } from 'react-redux';
import CharacterHistory, { ICharacterHistoryProps } from 'components/CharacterHistory';
import * as actions from 'state/actions/history';
import { IStoreState } from 'state/types';
import { IAction } from 'state/actions/types';

interface IMapStateToProps {
  history: IAction[];
}

interface IMapDispatchToProps {
  onDelete: (id: number) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return { history: state.get('history') };
}

function mapDispatchToProps(dispatch: Dispatch<actions.IHistoryAction>): IMapDispatchToProps {
  return { onDelete: (id: number) => {
    dispatch(actions.historyDeleteUpTo(id));
  }};
}

function mergeProps(
  propsFromState: IMapStateToProps,
  propsForDispatch: IMapDispatchToProps
): ICharacterHistoryProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterHistory);
