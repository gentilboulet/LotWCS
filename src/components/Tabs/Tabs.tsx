import * as classnames from 'classnames';
import * as React from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

export interface ITabsProps {
  defaultTab?: string;
}

interface ITabsState {
  activeTab?: string;
}

export interface ITabProps {
    tabId: string;
    title: string;
}

class Tab extends React.Component<ITabProps, object> {}

class Tabs extends React.Component<ITabsProps, ITabsState> {
  constructor(props: ITabsProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: this.props.defaultTab,
    };
  }
  public render() {
    /* tslint:disable:no-any */
    return (
      <div>
        <Nav tabs={true}>
        {React.Children.map(this.props.children, (child: any) => {
          return (<NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === child.props.tabId })}
                      onClick={() => this.toggle(child.props.tabId)}
                    >
                      {child.props.title}
                    </NavLink>
                  </NavItem>);
          }
        )}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
        {React.Children.map(this.props.children, (child: any) => {
          return (<TabPane tabId={child.props.tabId} >
                    {child.props.children}
                  </TabPane>);
          }
        )}
        </TabContent>
      </div>
    );
  }

  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
}

export { Tabs, Tab };
