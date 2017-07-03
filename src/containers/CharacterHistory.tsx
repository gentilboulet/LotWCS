import { connect, Dispatch } from 'react-redux';
import CharacterHistory from '../components/CharacterHistory';
import * as actions from '../actions/history';
import { IStoreState } from '../types/state';
import { IAction } from '../types/actions';

interface ImapStateToProps {
  history: IAction[];
}

interface ImapDispatchToProps {
  onDelete: (id: number) => void;
}

function mapStateToProps(state: IStoreState): ImapStateToProps {
  return { history: state.get('history') };
}

function mapDispatchToProps(dispatch: Dispatch<actions.IHistoryAction>): ImapDispatchToProps {
  /* tslint:disable:no-console */
  return { onDelete: (id: number) => { console.log('onDelete :' + id); dispatch(actions.historyDelete(id)); }};
}

function mergeProps(mapStateToProps: ImapStateToProps,
                    mapDispatchToProps: ImapDispatchToProps) {
  return Object.assign(mapStateToProps, mapDispatchToProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterHistory);
