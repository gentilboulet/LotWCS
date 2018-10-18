import * as React from 'react';
import Icon from 'react-fa';

import FieldHeader from 'components/FieldHeader';

export interface IEditNumericProps {
  name: string | JSX.Element;
  value: number;
  canBuy: boolean;
  onBuy: () => void;
}

interface IEditNumericState {
  edit: boolean;
}

class EditNumeric extends React.PureComponent<IEditNumericProps, IEditNumericState> {
  constructor(props: IEditNumericProps) {
    super(props);

    this.state = {
      edit: false,
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.doBuy = this.doBuy.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    if (!this.state.edit) {
      return(
        <div>
          <div
            onClick={this.startEdit}
            role="button"
          >
          <div>{this.renderHeader()}</div>
          <div>{this.props.value}</div>
          </div>
        </div>
      );
    } else {
      return(
        <div>
          <div>
            <div>{this.renderHeader()}</div>
            <div>
              <div>
                <input value={this.props.value} readOnly={true} />
                <div>
                  {this.props.canBuy ? this.renderButton('plus', this.doBuy) : null }
                  {this.renderButton('times', this.endEdit)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  public componentDidUpdate() {
    if(this.state.edit && !this.props.canBuy )
    {
      this.endEdit();
    }
  }

  private startEdit() {
    if(this.props.canBuy) {
      this.setState({edit: true});
    }
  }

  private endEdit() {
    this.setState({
      edit: false,
    });
  }

  private doBuy() {
    this.props.onBuy();
  }

  private renderHeader(): JSX.Element {
    return <FieldHeader label={this.props.name} />;
  }

  private renderButton(icon: string, f: () => void) {
    return <div onClick={f}><Icon name={icon}/></div>;
  }
}

export default EditNumeric;
