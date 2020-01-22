import { connect } from "react-redux";

import { IStoreState } from "../../state";

import Destiny, { IDestinyProps } from "../../components/Character/Destiny";

function mapStateToProps(state: IStoreState): IDestinyProps {
  return {
    value: state.character.destiny
  };
}

export default connect(mapStateToProps)(Destiny);
