import * as React from 'react';
import { FormGroup, Label, ButtonGroup, Button } from 'reactstrap';

import './radio.css';

interface IChoice {
  key: string;
  name: string;
  chosen?: boolean;
}

interface IRadioProps {
  title: string;
  choices: IChoice[];
}

interface IRadioState {
  title: string;
  choices: IChoice[];
  chosen: string;
}

class Radio extends React.Component<IRadioProps, IRadioState> {
  constructor(props: IRadioProps) {
    super(props);
    this.renderOptions = this.renderOptions.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem(choice: IChoice) {
    this.props.choices.map(choice => {
      choice.chosen = false;
    });
    choice.chosen = true;
  }

  renderOptions(): JSX.Element[] {
    return this.props.choices.map((choice: IChoice): JSX.Element => {
      return (
        <Button
          className={choice.chosen ? 'btn-success' : ''}
          key={choice.key}
          onClick={() => {
            this.selectItem(choice);
          }}
        >
          {choice.name}
        </Button>
      );
    });
  }

  render(): JSX.Element {
    return (
      <FormGroup className="radioChoice">
        <Label>
          {this.props.title}
        </Label>
        <ButtonGroup>
          {this.renderOptions()}
        </ButtonGroup>
      </FormGroup>
    );
  }
}

export default Radio;
