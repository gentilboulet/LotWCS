import * as React from 'react';

class PlaceHolder extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <div>
        <div>This is a placeholder </div>
        <div>The content will soon be added</div>
        <div>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default PlaceHolder;
