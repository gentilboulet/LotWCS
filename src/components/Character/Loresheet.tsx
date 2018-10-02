import * as React from 'react';

import { IDataLoresheet, loresheets } from 'data/loresheets';
import { ICost } from 'state/costs';

import ModalCard from 'components/ModalCard';

export interface ILoresheetProps {
  uid: string;
  known: boolean;
  cost: ICost;
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
}

class Loresheet extends React.Component<ILoresheetProps, {}> {
  constructor(props: ILoresheetProps) {
    super(props);

    this.onBuy = this.onBuy.bind(this);
  }

  public render() { 
    const found = loresheets.find((ls: IDataLoresheet) => ls.uid === this.props.uid);
    if( found === undefined) { return; }
    const card = {
      text: found.description,
      title: found.name,
    };
    return <ModalCard card={card} />;
  }

  private onBuy(): void { this.props.onBuy(this.props.cost); }
}

export default Loresheet;
