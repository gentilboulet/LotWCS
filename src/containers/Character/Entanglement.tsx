import { connect } from "react-redux";

import { ICharacterState } from "../../state/type";

import Entanglement, {
  IEntanglementProps
} from "../../components/Character/Entanglement";

function mapStateToProps(state: ICharacterState): IEntanglementProps {
  return {
    value: state.entanglement
  };
}

export default connect(mapStateToProps)(Entanglement);
