import * as React from 'react';

import PlaceHolder from '../components/PlaceHolder/PlaceHolder';

export interface Props {}

class CharacterBody extends React.Component<Props, object> {
  render() {
    return (
      <PlaceHolder>Character sheet contents. Will soon provide more stuff than this.</PlaceHolder>
    );
  }
}

export default CharacterBody;
