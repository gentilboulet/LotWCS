import { connect, Dispatch } from 'react-redux';
import CharacterLoresheets from '../components/CharacterLoresheets';
import * as actions from '../actions/loresheets';
import { IStoreState, IStoreLoresheetsJS, IStoreLoresheetOptionJS } from '../types/state';
import { canOpenLoresheet, getCostOpenLoresheet,
  canBuyOptionLoresheet, getCostBuyOptionLoresheet } from './costs';
import { ICharacterLoresheetsProps,
  ILoresheetsCharacterLoresheetsProps, ILoresheetsOptionsCharacterLoresheetsProps,
  ILoresheetsOptionsCostCharacterLoresheetsProps
} from '../components/CharacterLoresheets';
import { ICost } from '../types/costs';
import { ILoresheet, ILoresheetOption } from '../types/loresheets';
import { loresheets as dataLS, lsOptionCostToValues } from '../data/loresheets';

interface IMapStateToProps {
  loresheets: ILoresheetsCharacterLoresheetsProps[];
}

interface IMapDispatchToProps {
  onOpenLS: (uid: string, cost: ICost) => void;
  onBuyOptionLS: (lsUID: string, uid: string, cost: ICost) => void;
}

function mapStateToProps(state: IStoreState): IMapStateToProps {
  return {
    loresheets: dataLS.map((ls: ILoresheet): ILoresheetsCharacterLoresheetsProps => {
      const knIdx = state.get('loresheets')
        .findIndex((stateLS: IStoreLoresheetsJS) => { return stateLS.uid === ls.uid; });
      return {
        uid: ls.uid,
        name: ls.name,
        category: ls.category,
        description: ls.description,
        ruleset: ls.ruleset,

        options: ls.options.map((op: ILoresheetOption): ILoresheetsOptionsCharacterLoresheetsProps => {
          return {
            uid: op.uid,
            type: op.type,
            description: op.description,

            known: (knIdx >= 0 &&
                    state.getIn(['loresheets', knIdx, 'options']).findIndex(
              (knOp: IStoreLoresheetOptionJS) => { return knOp.uid === op.uid; }) >= 0),
            costs: lsOptionCostToValues(op.cost).map((v: number): ILoresheetsOptionsCostCharacterLoresheetsProps => {
              return {
                originalCost: v,
                canBuy: canBuyOptionLoresheet(state, ls.uid, op.uid, v),
                cost: getCostBuyOptionLoresheet(state, ls.uid, op.uid, v)
              };
             }),
            costsStr: op.cost
          };
        }),

        known: (knIdx !== -1 ),
        canOpen: canOpenLoresheet(state, ls.uid, ls.cost),
        cost: getCostOpenLoresheet(state, ls.uid, ls.cost),
        costStr: String(ls.cost)
      };
    })
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.ILoresheetAction>): IMapDispatchToProps {
  return {
    onOpenLS: (uid: string, cost: ICost) => dispatch(actions.loresheetOpen(uid, cost)),
    onBuyOptionLS: (lsUid: string, uid: string, cost: ICost) => dispatch(actions.loresheetBuyBonus(lsUid, uid, cost))
  };
}

function mergeProps(mapStateToProps: IMapStateToProps,
                    mapDispatchToProps: IMapDispatchToProps): ICharacterLoresheetsProps {
  return Object.assign({}, mapStateToProps, mapDispatchToProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacterLoresheets);
