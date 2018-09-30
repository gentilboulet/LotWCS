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
  private canBuy: boolean;
  private indexNewSpeciality: number;

  constructor(props: IEditSpecialitiesProps) {
    super(props);

    this.state = {
      edit: false
    };

    if(this.props.available !== undefined)
    {
      this.canBuy = this.props.available.some(option => option.canBuy);
      this.indexNewSpeciality = this.props.available.findIndex(option => option.name.length === 0)
    }
    else { this.canBuy = false; }

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
    return <Container>
      <Row
        onClick={this.startEdit}
        role="button"
        >{this.renderBoughtSpecialities()}</Row>
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
              defaultSelected={this.props.bought}
              placeholder="Chose a speciality..."
              onChange={this.selectedChange}
            />
            <InputGroupAddon addonType="append">
              {this.renderButton('times', this.endEdit)}
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  }

  private startEdit(): void {
    if(this.canBuy) {
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
      if(this.props.available[this.indexNewSpeciality].canBuy) {
        this.props.onBuy(speciality, this.props.available[this.indexNewSpeciality].cost);
      }
    }
  }
};

export default EditSpecialities;
