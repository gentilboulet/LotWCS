import { connect, Dispatch } from 'react-redux';
import CharacterLoresheets from '../components/CharacterLoresheets';
import * as actions from '../actions/loresheets';
import { IStoreState } from '../types/state';

import { loresheets } from '../data/loresheets';

export interface IKnownLoresheetsProps {
  name: string;
  bonuses: number[];
}
interface ImapStateToProps {
  knownLoresheets: IKnownLoresheetsProps[];
}

interface ImapDispatchToProps {

}

function mapStateToProps(state: IStoreState): ImapStateToProps {
  return { knownLoresheets: [] };
}

function mapDispatchToProps(dispatch: Dispatch<actions.ILoresheetAction>): ImapDispatchToProps {
  /* tslint:disable:no-console */
  return {};
}

function mergeProps(mapStateToProps: ImapStateToProps,
                    mapDispatchToProps: ImapDispatchToProps) {

  const mergeProps = {
    categories: loresheets
      .map( d => { return d.category; })
      .filter(
        (value: string, index: number, self: Array<string>) => { return self.indexOf(value) === index; }
      ),
      loresheets: loresheets,
  };
  return Object.assign(mapStateToProps, mapDispatchToProps, mergeProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterLoresheets);
