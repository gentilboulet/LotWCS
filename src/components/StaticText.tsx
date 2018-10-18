import * as React from 'react';

import FieldHeader from './FieldHeader';

export interface IStaticTextProps {
  header: string;
  value: string;
}

class StaticText extends React.PureComponent<IStaticTextProps, {}> {
  public render = (): JSX.Element => {
    return (
      <div>
        <div>{this.renderHeader()}</div>
        <div>{this.props.value}</div>
      </div>
    );
  }

  private renderHeader = (): JSX.Element => {
    return <FieldHeader label={this.props.header} />;
  }
}

export default StaticText;
