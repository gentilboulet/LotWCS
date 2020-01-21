import { connect } from "react-redux";

import { ICharacterState } from "../../state/type";

import Destiny, { IDestinyProps } from "../../components/Character/Destiny";

function mapStateToProps(state: ICharacterState): IDestinyProps {
  return {
    value: state.destiny
  };
}

export default connect(mapStateToProps)(Destiny);
