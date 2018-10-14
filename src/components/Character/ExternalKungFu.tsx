import * as React from 'react';
import { Button, Col, Container, Row, Table } from 'reactstrap';

import { IDataExternalKungfu, IDataExternalKungfuStatistics, KUNGFU_EXTERNAL, kungfuData, } from 'data/kungfu';
import { ICost } from 'state/costs';

import ExternalKungFuTechnique from 'containers/Character/ExternalKungFuTechnique';
import { Icon } from 'react-fa';

export interface IExternalKungFuProps {
  uid: string;
  isOpen: boolean;
  cost: ICost;
  canOpen: boolean;
  knownTechniques: string[];
  onOpen: (cost: ICost) => void;
  statistics: IDataExternalKungfuStatistics;
}

const styles = {
  button: {
    marginLeft: '5px',
    marginRight: '5px',
  },
  col: {
    padding: '0px',
  },
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

class ExternalKungFu extends React.Component<IExternalKungFuProps, {}> {
  constructor(props: IExternalKungFuProps) {
    super(props);

    this.renderCrunch = this.renderCrunch.bind(this);
    this.renderStats = this.renderStats.bind(this);
    this.renderTechniques = this.renderTechniques.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    const data = kungfuData(KUNGFU_EXTERNAL, this.props.uid) as IDataExternalKungfu;
    return  <Container fluid={true} style={styles.container}>
              <Row>
                <Col xs={10} style={styles.col}>{this.renderCrunch(data)}</Col>
                <Col xs={2} style={styles.col}>{this.renderStats()}</Col>
              </Row>
            </Container>
  }

  private renderCrunch(data: IDataExternalKungfu): JSX.Element {
    return <div>
             <div><h4 style={styles.inline}>{data.name}</h4><span style={styles.right}>{this.renderButton()}</span></div>
             <div>
               <h5 style={styles.inline}>Weapons</h5>:
               <p style={styles.inline}>
                 {data.weapons.map(w => <Button key={w} outline={true} disabled={true} style={styles.button} size="sm">{w}</Button>)}
               </p>
             </div>
             <div><h5 style={styles.inline}>Laught</h5>: <p style={styles.inline}>{data.laugths}</p></div>
             <div><h5 style={styles.inline}>Fears</h5>: <p style={styles.inline}>{data.fears}</p></div>
             <div><h5 style={styles.inline}>Techniques</h5></div>
             {this.renderTechniques(data)}
           </div>
  }

  private renderStats(): JSX.Element {
    return <Table>
             <tbody>
             {
               Object.keys(this.props.statistics).map(s => {
                 return <tr key={s}><td>{s}</td><td>{this.props.statistics[s]}</td></tr>;
               })
             }
             </tbody>
           </Table>;
  }

  private renderTechniques(data: IDataExternalKungfu): JSX.Element {
    return <Table hover={true}>
             <thead>
               <tr>
                 <th>Name</th>
                 <th>Cost</th>
                 <th>Effect</th>
                 <th />
               </tr>
             </thead>
             <tbody>
             {data.techniques.map(t => <ExternalKungFuTechnique key={t.uid} styleUid={data.uid} uid={t.uid} />)}
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

export default ExternalKungFu;
