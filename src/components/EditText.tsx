import * as React from 'react';
import Icon from 'react-fa';

import FieldHeader from 'components/FieldHeader';

export interface IEditTextProps {
  header: string;
  default?: string;
  locked?: boolean;
  validate: (v: string) => boolean ;
  onSubmit: (v: string) => void;
}

interface IEditTextState {
  value: string;
  edit: boolean;
}

export interface IEditTextEvent {
  target: { value: string };
}

class EditText extends React.PureComponent<IEditTextProps, IEditTextState> {
  constructor(props: IEditTextProps) {
    super(props);

    this.state = {
      edit: false,
      value: this.props.default ? this.props.default : '',
    };

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  public render(): JSX.Element {
    return (this.state.edit) ? this.renderInput() : this.renderValue();
  }

  public componentWillReceiveProps(nextProps: IEditTextProps) {
    this.setState({
      value: nextProps.default ? nextProps.default : '',
    });
  }

  private startEdit = () => {
    if (this.props.locked ? false : true) {
      this.setState({edit: true});
    }
  }

  private endEdit = () => {
    this.setState({
      edit: false,
      value: this.state.value.trim(),
    });
    if ( this.props.validate(this.state.value) ) {
      if (this.state.value !== this.props.default) {
        this.props.onSubmit(this.state.value);
      }
    }
  }

  private textChange = (e: IEditTextEvent) => {
    this.setState({ value: e.target.value });
  }

  private renderHeader = (): JSX.Element => {
    return <FieldHeader label={this.props.header} />;
  }

  private renderdiv = (isValueValid: boolean): JSX.Element => {
    const btnOk = (<div onClick={this.endEdit} color="success"><Icon name="check" /></div>);
    const btnKo = (<div onClick={this.endEdit} color="danger"><Icon name="times" /></div>);
    return (isValueValid) ? btnOk : btnKo;
  }

  private renderValue = (): JSX.Element => {
    return (
      <div
        onClick={this.startEdit}
        role="button"
      >
        <div>{this.renderHeader()}</div>
        <div>{this.state.value}</div>
      </div>
    );
  }

  private renderInput = (): JSX.Element => {
    const isValueValid = this.props.validate(this.state.value);
    return (
      <div>
        <div>{this.renderHeader()}</div>
        <div>
          <div>
            <input
              onChange={this.textChange}
              value={this.state.value}
            />
            <div>
                {this.renderdiv(isValueValid)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditText;
