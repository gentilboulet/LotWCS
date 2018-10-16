import * as React from 'react';
import { Button, Table } from 'reactstrap';

import { IDataInternalKungfu, KUNGFU_INTERNAL, kungfuData, } from 'data/kungfu';
import { ICost } from 'state/costs';

import InternalKungFuTechnique from 'containers/Character/InternalKungFuTechnique';
import { Icon } from 'react-fa';

export interface IInternalKungFuProps {
  uid: string;
  isOpen: boolean;
  cost: ICost;
  canOpen: boolean;
  knownTechniques: string[];
  onOpen: (cost: ICost) => void;
}

const styles = {
  button: {
    marginLeft: '5px',
    marginRight: '5px',
  },
  inline: {
    display: 'inline'
  },
  right: {
    float: 'right' as 'right',
  }
};

class InternalKungFu extends React.Component<IInternalKungFuProps, {}> {
  constructor(props: IInternalKungFuProps) {
    super(props);

    this.renderTechniques = this.renderTechniques.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    const data = kungfuData(KUNGFU_INTERNAL, this.props.uid) as IDataInternalKungfu;
    return <div>
             <div><h4 style={styles.inline}>{data.name}</h4><span style={styles.right}>{this.renderButton()}</span></div>
             <div><h5 style={styles.inline}>description</h5>: <p style={styles.inline}>{data.description}</p></div>
             <div><h5 style={styles.inline}>Element</h5>:<p style={styles.inline}>{data.element}</p></div>
             <div><h5 style={styles.inline}>Techniques</h5></div>
             {this.renderTechniques(data)}
            </div>
  }

  private renderTechniques(data: IDataInternalKungfu): JSX.Element {
    return <Table hover={true}>
             <thead>
               <tr>
                 <th>Name</th>
                 <th>Level</th>
                 <th>Effect</th>
                 <th />
               </tr>
             </thead>
             <tbody>
             {data.techniques.sort((a, b) => a.level-b.level).map(t => <InternalKungFuTechnique key={t.uid} styleUid={data.uid} uid={t.uid} />)}
             </tbody>
           </Table>
  }

  private renderButton(): JSX.Element {
    const onClick = () => this.props.onOpen(this.props.cost);
    if(this.props.canOpen) { return (<Button color="success" style={styles.inline} onClick={onClick}><Icon name="unlock-alt" /></Button>); }
    else if(this.props.isOpen) { return <Button color="primary" style={styles.inline} disabled={true}><Icon name="leanpub" /></Button>; }
    else { return (<Button color="danger" style={styles.inline}><Icon name="times" /></Button>); }
  }
}

export default InternalKungFu;
