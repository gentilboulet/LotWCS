import * as React from 'react';

import ControlledListItem from './ControlledListItem';

export interface IControlledListProps {
  options: Array<{id: string, label: string, disabled?: boolean}>;
  preSelected?: string[];
  renderItem: (id: string) => JSX.Element;
}

export interface IControlledListState {
  selected: string[],
}

class ControlledList extends React.PureComponent<IControlledListProps, IControlledListState> {
  constructor(props: IControlledListProps) {
    super(props);

    this.state = {
      selected: this.props.preSelected ? this.props.preSelected : [],
    };

    this.renderList = this.renderList.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.itemOnSelectedToggle = this.itemOnSelectedToggle.bind(this);
  }

  public render() {
    return (
      <div>
        <div>
          <div>
            <div>{this.renderList()}</div>
          </div>
          <div>
            {this.renderSelected()}
          </div>
        </div>
      </div>
    );
  }

  private renderList(): JSX.Element[] {
    return this.props.options.map(o => {
      if(! o.disabled) {
        const toggle = () => this.itemOnSelectedToggle(o);
        const selected = this.state.selected.indexOf(o.id) !== -1;
        return <ControlledListItem key={o.id} label={o.label} onSelectedToggle={toggle} selected={selected} />;
      } else {
        return <ControlledListItem key={o.id} label={o.label} />;
      }
    });
  }

  private renderSelected(): JSX.Element[] {
    return this.state.selected
      .map(selected => {
        const element = this.props.renderItem(selected);
        return <div key={selected}>{element}</div>;
      });
  }

  private itemOnSelectedToggle(item: {id: string, label: string}): void {
    this.setState((prevState: IControlledListState): IControlledListState => {
      const idx = prevState.selected.indexOf(item.id);
      const newList = this.state.selected.slice();

      if(idx < 0) { newList.splice(0, 0, item.id); }
      else { newList.splice(idx, 1) }

      newList.sort((a, b) => {
        return this.props.options.findIndex(o=> o.id === a) - this.props.options.findIndex(o=> o.id === b);
      });

      return {
        selected: newList,
      };
    });
  }
}

export default ControlledList;
