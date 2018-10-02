import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { ICost } from 'state/costs';

import { IDataVirtueType, VIRTUE_CHIVALROUS, VIRTUE_SELFISH } from 'data/virtues';

import EditNumeric from 'components/EditNumeric';
import FieldHeader from 'components/FieldHeader';

interface IVirtueProp {
  type: IDataVirtueType,
  name: string,
  value: number,
  cost: ICost,
  canBuy: boolean,
  onBuy: () => void
};

export interface IVirtuesProps {
  virtues: IVirtueProp[];
}

class Virtues extends React.Component<IVirtuesProps, {}> {
  constructor(props: IVirtuesProps) {
    super(props);
  }

  public render() {
    const chivalrousVirtues = this.props.virtues.filter(v => v.type === VIRTUE_CHIVALROUS);
    const selfishVirtues = this.props.virtues.filter(v => v.type === VIRTUE_SELFISH);
    const max = Math.max(chivalrousVirtues.length, selfishVirtues.length);

    const rows = [
      <Row key="header"><Col><FieldHeader label="Chivalrous Virtues" /></Col><Col><FieldHeader label="Selfish Virtues" /></Col></Row>
    ];
    for(let i = 0; i < max; i++) {
      const cvCol = (i < chivalrousVirtues.length) ? (<Col>{this.renderVirtue(chivalrousVirtues[i])}</Col>) : <Col />;
      const svCol = (i < selfishVirtues.length) ? <Col>{this.renderVirtue(selfishVirtues[i])}</Col> : <Col />;

      rows.push(<Row key={'virtues_'+i}>{cvCol}{svCol}</Row>);
    }
    return <Container>{rows.map(r => r)}</Container>;
  }

  private renderVirtue(virtue: IVirtueProp): JSX.Element {
    return <EditNumeric
              name={virtue.name}
              value={virtue.value}
              canBuy={virtue.canBuy}
              onBuy={virtue.onBuy}
            />;
  }

}

export default Virtues;
