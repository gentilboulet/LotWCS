import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Button, InputGroup, InputGroupAddon } from "reactstrap";

import TokenInput from "../../components/TokenInput";
import { ICost } from "../../state/models/character/costs";

interface IEditSpecialitiesProps {
  bought: string[];
  specialities: {
    name: string;
    canBuy: boolean;
    cost: ICost;
  }[];
  onBuy: (speciality: string, cost: ICost) => void;
}

interface IEditSpecialitiesState {
  edit: boolean;
}

class EditSpecialities extends React.PureComponent<
  IEditSpecialitiesProps,
  IEditSpecialitiesState
> {
  constructor(props: IEditSpecialitiesProps) {
    super(props);
    this.state = {
      edit: false,
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.isValueValid = this.isValueValid.bind(this);

    this.buySpeciality = this.buySpeciality.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderBoughtSpecialities = this.renderBoughtSpecialities.bind(this);
    this.renderNoEdit = this.renderNoEdit.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
  }

  public render() {
    if (!this.state.edit) {
      return this.renderNoEdit();
    } else {
      return this.renderEdit();
    }
  }

  private renderButton(icon: IconProp, color: string, f: () => void) {
    return (
      <Button onClick={f} color={color}>
        <FontAwesomeIcon icon={icon} />
      </Button>
    );
  }

  private renderBoughtSpecialities() {
    return this.props.bought.map((speciality: string, index: number) => {
      return (index > 0 ? ", " : "") + speciality;
    });
  }

  private renderNoEdit() {
    const canBuy = this.props.specialities.some(
      option => option.canBuy && option.cost.canPay,
    );
    return (
      <InputGroup onClick={this.startEdit} role="button">
        <div className="form-control">{this.renderBoughtSpecialities()}</div>
        {canBuy ? (
          <InputGroupAddon addonType="append">
            {this.renderButton("plus", "default", this.startEdit)}
          </InputGroupAddon>
        ) : (
          ""
        )}
      </InputGroup>
    );
  }

  private renderEdit() {
    const optionList = this.props.specialities.map(speciality => {
      return { id: speciality.name, name: speciality.name };
    });

    return (
      <InputGroup>
        <TokenInput
          allowNew={true}
          labelKey="name"
          onAdd={this.buySpeciality}
          options={optionList}
          tokens={this.props.bought}
        />
        <InputGroupAddon addonType="append">
          {this.renderButton("check", "success", this.endEdit)}
        </InputGroupAddon>
      </InputGroup>
    );
  }

  private startEdit(): void {
    const canBuy = this.props.specialities.some(option => option.canBuy);
    if (canBuy) {
      this.setState({ edit: true });
    }
  }

  private endEdit(): void {
    this.setState({
      edit: false,
    });
  }

  private isValueValid(specialityName: string): boolean {
    return (
      this.props.bought.findIndex(
        speciality => specialityName === speciality,
      ) === -1
    );
  }

  private buySpeciality(speciality: string) {
    if (speciality.length === 0) {
      return;
    }
    if (!this.isValueValid(speciality)) {
      return;
    }

    const foundIndex = this.props.specialities.findIndex(available => {
      return available.name === speciality;
    });
    if (foundIndex !== -1) {
      if (this.props.specialities[foundIndex].canBuy) {
        this.props.onBuy(
          this.props.specialities[foundIndex].name,
          this.props.specialities[foundIndex].cost,
        );
      }
    } else {
      const indexNewSpeciality = this.props.specialities.findIndex(
        option => option.name.length === 0,
      );
      if (this.props.specialities[indexNewSpeciality].canBuy) {
        this.props.onBuy(
          speciality,
          this.props.specialities[indexNewSpeciality].cost,
        );
      }
    }
  }
}

export default EditSpecialities;
