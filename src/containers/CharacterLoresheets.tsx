import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as costs from 'costs/state';
import * as loresheetsActions from 'state/actions/loresheets';
import * as loresheets from 'state/loresheets';

import { ICharacterLoresheetsProps,
  ILoresheetsCharacterLoresheetsProps, ILoresheetsOptionsCharacterLoresheetsProps,
  ILoresheetsOptionsCostCharacterLoresheetsProps
} from 'components/CharacterLoresheets';

import { ICost } from 'costs/types';
import { IStoreState } from 'state/types';

import * as dataLoresheets from 'data/loresheets';

import CharacterLoresheets from 'components/CharacterLoresheets';

interface IMapStateToProps {
  loresheets: ILoresheetsCharacterLoresheetsProps[];
}

interface IMapDispatchToProps {
  onOpenLS: (uid: string, cost: ICost) => void;
  onBuyOptionLS: (lsUID: string, uid: string, cost: ICost) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    loresheets: dataLoresheets.loresheets
      .map((ls: dataLoresheets.IDataLoresheet): ILoresheetsCharacterLoresheetsProps => {
        return {
          uid: ls.uid,

          category: ls.category,
          description: ls.description,
          name: ls.name,
          ruleset: ls.ruleset,

          options: ls.options
          .map((op: dataLoresheets.IDataLoresheetOption): ILoresheetsOptionsCharacterLoresheetsProps => {
            return {
              uid: op.uid,

              description: op.description,
              type: op.type,

              known: (loresheets.getLoresheetOptionIndex(state, ls.uid, op.uid) >= 0),

              costs: dataLoresheets.lsOptionCostToValues(op.cost)
                .map((v: number): ILoresheetsOptionsCostCharacterLoresheetsProps => {
                  return {
                    canBuy: costs.canBuyOptionLoresheet(state, ls.uid, op.uid, v),
                    cost: costs.getCostBuyOptionLoresheet(state, ls.uid, op.uid, v),
                    originalCost: v
                  };
                }),
              costsStr: op.cost
            };
          }),

          canOpen: costs.canOpenLoresheet(state, ls.uid, ls.cost),
          cost: costs.getCostOpenLoresheet(state, ls.uid, ls.cost),
          costStr: String(ls.cost),
          known: (loresheets.getLoresheetIndex(state, ls.uid) >= 0)
      };
    })
  };
}

function mapDispatchToProps(dispatch: Dispatch<loresheetsActions.ILoresheetAction>): IMapDispatchToProps {
  return {
    onBuyOptionLS: (lsUid: string, uid: string, cost: ICost) => dispatch(loresheetsActions.buyOption(lsUid, uid, cost)),
    onOpenLS: (uid: string, cost: ICost) => dispatch(loresheetsActions.open(uid, cost)),
  };
}

function mergeProps(propsFromState: IMapStateToProps,
                    propsForDispatch: IMapDispatchToProps): ICharacterLoresheetsProps {
  return Object.assign({}, propsFromState, propsForDispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterLoresheets);
