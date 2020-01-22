import * as React from "react";

import "./TokenInput.css";

interface ITokenInputProps {
  allowNew?: boolean;
  idKey?: string;
  labelKey?: string;
  onAdd: (id: string) => void;
  options: any[];
  tokens?: string[];
}

interface ITokenInputState {
  input: string;
  focused: boolean;
}

class TokenInput extends React.PureComponent<
  ITokenInputProps,
  ITokenInputState
> {
  public static defaultProps = {
    idKey: "id",
    labelKey: "name",
  };

  private idKey: string;
  private labelKey: string;

  constructor(props: ITokenInputProps) {
    super(props);

    this.labelKey = this.props.labelKey
      ? this.props.labelKey
      : TokenInput.defaultProps.labelKey;

    this.idKey = this.props.idKey
      ? this.props.idKey
      : TokenInput.defaultProps.idKey;

    this.state = {
      focused: false,
      input: "",
    };

    this.inputChange = this.inputChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  public render() {
    return (
      <div className="form-control">
        <div className="TokenInput">
          <div className="TokenInput-token-list">{this.renderTokens()}</div>
          <div className="TokenInput-dropdown">
            <input
              className="TokenInput-input"
              onBlur={this.onBlur}
              onChange={this.inputChange}
              onFocus={this.onFocus}
              value={this.state.input}
            />
            <div className="TokenInput-dropdown-content">
              {this.renderSuggestion()}
              {this.renderAddNew()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderTokens(): JSX.Element[] {
    return (this.props.tokens as string[]).map(t => (
      <span key={t} className="TokenInput-token">
        {t}
      </span>
    ));
  }

  private renderSuggestion() {
    return this.matchOptionsWithInput(false)
      .filter((option: any) => option[this.labelKey].length > 0)
      .filter(option => {
        const label = option[this.labelKey];
        const id = option[this.idKey];

        if (!label || !id) {
          return false;
        }
        return true;
      })
      .map((option: any) => {
        const label = option[this.labelKey];
        const id = option[this.idKey];
        const onClick = () => {
          this.props.onAdd(id);
          this.resetState();
        };
        return (
          <span key={id} onMouseDown={onClick}>
            {label}
          </span>
        );
      });
  }

  private renderAddNew(): JSX.Element | void {
    if (!this.state.focused) {
      return;
    }
    if (
      this.props.allowNew &&
      this.state.input.length > 0 &&
      this.matchOptionsWithInput(true).length === 0
    ) {
      const onClick = () => {
        this.props.onAdd(this.state.input);
        this.resetState();
      };
      return (
        <span id="addNew" onMouseDown={onClick}>
          Add a new entry : {this.state.input}
        </span>
      );
    }
  }

  private onFocus(): void {
    this.setState({
      focused: true,
    });
  }

  private onBlur(): void {
    /*this.setState({
      focused: false
    });*/
  }

  private inputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      input: event.target.value.trim(),
    });
  }

  private resetState(): void {
    this.setState({
      input: "",
    });
  }

  private matchOptionsWithInput(exact: boolean): any[] {
    if (!this.state.focused) {
      return [];
    }
    const inputPrep = this.state.input.toLowerCase().trim();

    return this.props.options
      .filter((option: any) => {
        /* tslint:disable no-console */
        if (this.props.tokens) {
          return !this.props.tokens.some(token => {
            return token === option[this.labelKey];
          });
        } else {
          return true;
        }
      })
      .filter((option: any) => {
        const label = option[this.labelKey];
        if (!label) {
          return false;
        }

        const labelPrep = label.toLowerCase().trim();

        if (!exact && this.state.input.length > 0) {
          return labelPrep.indexOf(inputPrep) !== -1;
        } else if (exact) {
          return inputPrep === labelPrep;
        } else {
          return true;
        }
      });
  }
}

export default TokenInput;
