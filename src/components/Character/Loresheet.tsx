import * as React from 'react';
import Icon from 'react-fa';
import { Button, Table } from 'reactstrap';

import { getLoresheetData, IDataLoresheet } from 'data/loresheets';
import { ICost } from 'state/costs';

import LoresheetOption from 'containers/Character/LoresheetOption';

export interface ILoresheetProps {
  uid: string;
  known: boolean;
  cost: ICost;
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
}

const styles = {
  container: {
    borderColor: 'lightgrey',
    borderRadius: '10px',
    borderStyle: 'solid',
    borderWidth: '1px',
    marginBottom: '5px',
    marginTop: '5px',
  },
  inline: {
    display: 'inline'
  },
  right: {
    float: 'right' as 'right',
  }
};

class Loresheet extends React.Component<ILoresheetProps, {}> {
  constructor(props: ILoresheetProps) {
    super(props);

    this.renderOptions = this.renderOptions.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    const data = getLoresheetData(this.props.uid) as IDataLoresheet;
    return <div>
             <div><h4 style={styles.inline}>{data.name}</h4><span style={styles.right}>{this.renderButton()}</span></div>
             <div><p style={styles.inline}>{data.description}</p></div>
             <div>{this.renderOptions(data)}</div>
           </div>
  }

  private renderOptions(data: IDataLoresheet): JSX.Element {
    return <Table hover={true}>
             <thead>
               <tr>
                 <th>Type</th>
                 <th>Cost</th>
                 <th>Effect</th>
                 <th />
               </tr>
             </thead>
             <tbody>
             {data.options.map(o => <LoresheetOption key={o.uid} lsUid={data.uid} uid={o.uid} />)}
             </tbody>
           </Table>
  }

  private renderButton(): JSX.Element {
    const onClick = () => this.props.onBuy(this.props.cost);
    if(this.props.canBuy) { return (<Button color="success" style={styles.inline} onClick={onClick}><Icon name="unlock-alt" /></Button>); }
    else if(this.props.known) { return <Button color="primary" style={styles.inline} disabled={true}><Icon name="leanpub" /></Button>; }
    else { return (<Button color="danger" style={styles.inline}><Icon name="times" /></Button>); }
  }
}

export default Loresheet;
