import * as React from 'react';
import { Typeahead,  } from 'react-bootstrap-typeahead';
import Icon from 'react-fa';
import { Button, Col, Container, InputGroup, InputGroupAddon, Row } from 'reactstrap';

import { ICost } from 'state/costs';

interface IEditSpecialitiesProps {
  bought: string[];
  available: Array<{
    name: string,
    canBuy: boolean
    cost: ICost,
  }>;
  onBuy: (speciality: string, cost: ICost) => void
}

interface IEditSpecialitiesState {
  edit: boolean;
}

class EditSpecialities extends React.PureComponent<IEditSpecialitiesProps, IEditSpecialitiesState> {
  constructor(props: IEditSpecialitiesProps) {
    super(props);
    this.state = {
      edit: false
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.selectedChange = this.selectedChange.bind(this);
    this.isValueValid = this.isValueValid.bind(this);

    this.buySpeciality = this.buySpeciality.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderBoughtSpecialities = this.renderBoughtSpecialities.bind(this);
    this.renderNoEdit = this.renderNoEdit.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
  }

  public render() {
    if (!this.state.edit) { return this.renderNoEdit(); }
    else { return this.renderEdit(); }
  }

  private renderButton(icon: string, f: () => void) {
    return <Button onClick={f}><Icon name={icon}/></Button>;
  }

  private renderBoughtSpecialities() {
    return this.props.bought.map((speciality: string) => {
      return <Col key={speciality}>{speciality}</Col>;
    });
  }

  private renderNoEdit() {
    const canBuy = this.props.available.some(option => option.canBuy);
    return <Container>
             <Row>
               {this.renderBoughtSpecialities()}
               <Col xs={1} sm={1} md={1} lg={1} xl={1}>{canBuy ? this.renderButton('plus', this.startEdit) : ''}</Col>
             </Row>
           </Container>
  }

  private renderEdit() {
    return <Container>
      <Row>
        <Col>
          <InputGroup>
            <Typeahead
              allowNew={true}
              multiple={true}
              options={this.props.available
              .filter(data => data.canBuy)
              .map(data => data.name)}
              selected={this.props.bought}
              placeholder="Chose a speciality..."
              onChange={this.selectedChange}
            />
            <InputGroupAddon addonType="append">
              {this.renderButton('check', this.endEdit)}
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  }

  private startEdit(): void {
    const canBuy = this.props.available.some(option => option.canBuy);
    if(canBuy) {
      this.setState({edit: true});
    }
  }

  private endEdit(): void {
    this.setState({
      edit: false,
    });
  }

  private isValueValid(specialityName: string): boolean {
    return this.props.bought.findIndex(speciality => specialityName === speciality) === -1;
  }

  private selectedChange(selected: any[]): void {
    this.endEdit();
    selected.forEach((value: any) => {
      if(typeof value === "string") { this.buySpeciality(value); }
      else if (typeof value === "object") { this.buySpeciality(value.label); }
    });
  }

  private buySpeciality(speciality: string) {
    if(speciality.length === 0) { return; }
    if(!this.isValueValid(speciality)) { return; }

    const foundIndex = this.props.available.findIndex((available) => {
      return available.name === speciality;
    });

    if(foundIndex !== -1) {
      if(this.props.available[foundIndex].canBuy) {
        this.props.onBuy(this.props.available[foundIndex].name, this.props.available[foundIndex].cost);
      }
    } else
    {
      const indexNewSpeciality = this.props.available.findIndex(option => option.name.length === 0)
      if(this.props.available[indexNewSpeciality].canBuy) {
        this.props.onBuy(speciality, this.props.available[indexNewSpeciality].cost);
      }
    }
  }
};

export default EditSpecialities;
