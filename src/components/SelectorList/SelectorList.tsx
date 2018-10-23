import * as React from "react";

import { IOption } from "components/SelectorList";

import "./SelectorList.css";

interface ISelectorListProps {
  options: IOption[];
  preSelected?: string[];
  renderItem: (id: string) => JSX.Element;
}

export interface ISelectorListState {
  selected: string[];
  searched: string[];
}

class SelectorList extends React.PureComponent<
  ISelectorListProps,
  ISelectorListState
> {
  constructor(props: ISelectorListProps) {
    super(props);

    this.state = {
      searched: this.props.options.map(option => {
        if (option.meta) {
          return option.id;
        } else {
          return option.label;
        }
      }),
      selected: this.props.preSelected ? this.props.preSelected : []
    };

    this.renderList = this.renderList.bind(this);
    this.renderSearchBox = this.renderSearchBox.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.itemOnSelectedToggle = this.itemOnSelectedToggle.bind(this);
    this.searchInputChanged = this.searchInputChanged.bind(this);
  }

  public render() {
    return (
      <section className="selector-list">
        <aside className="left-list">
          {this.renderSearchBox()}
          {this.renderList()}
        </aside>
        <section className="right-list">{this.renderSelected()}</section>
      </section>
    );
  }

  private renderSearchBox(): JSX.Element {
    return (
      <div className="searchbox">
        <input
          type="search"
          placeholder="Search a style..."
          onChange={this.searchInputChanged}
        />
      </div>
    );
  }

  private renderList(): JSX.Element {
    return (
      <ul className="search-list">
        {this.state.searched.map(id => {
          const option = this.props.options.find(prop => {
            return prop.id === id;
          });
          if (option === undefined) {
            return;
          }
          if (!option.disabled) {
            const toggle = () => this.itemOnSelectedToggle(option);
            const selected = this.state.selected.indexOf(option.id) !== -1;

            return (
              <li className="item" onClick={toggle} key={option.id}>
                {selected ? <b>{option.label}</b> : option.label}
              </li>
            );
          } else {
            return (
              <li className="header" key={option.id}>
                {option.label}
              </li>
            );
          }
        })}
      </ul>
    );
  }

  private renderSelected(): JSX.Element[] {
    return this.state.selected.map(selected => {
      const element = this.props.renderItem(selected);
      return (
        <article className="selected-item" key={selected}>
          {element}
        </article>
      );
    });
  }

  private itemOnSelectedToggle(item: { id: string; label: string }): void {
    this.setState((prevState: ISelectorListState) => {
      const idx = prevState.selected.indexOf(item.id);
      const newList = this.state.selected.slice();

      if (idx < 0) {
        newList.splice(0, 0, item.id);
      } else {
        newList.splice(idx, 1);
      }

      newList.sort((a, b) => {
        return (
          this.props.options.findIndex(o => o.id === a) -
          this.props.options.findIndex(o => o.id === b)
        );
      });

      return {
        selected: newList
      };
    });
  }

  private searchInputChanged(event: React.ChangeEvent<HTMLInputElement>): void {
    const input = event.target.value.toLowerCase();
    this.setState({
      searched: this.props.options
        .filter(option => {
          if (input.length === 0) {
            return true;
          }
          if (option.meta) {
            return option.meta.toLowerCase().search(input) !== -1;
          } else {
            return option.label.toLowerCase().search(input) !== -1;
          }
        })
        .map(option => option.id)
    });
  }
}

export default SelectorList;
