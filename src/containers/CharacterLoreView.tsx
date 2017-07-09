import * as React from 'react';
import { connect } from 'react-redux';

class CharacterLoreView extends React.Component {
  render() {
    return (
      <div>
        <h1>Coin</h1>
      </div>
    );
  }
}

export default connect(state => state)(CharacterLoreView);
