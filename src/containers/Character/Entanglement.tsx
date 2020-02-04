import { connect } from "react-redux";

import { IStoreState } from "../../state";

import Entanglement, {
  IEntanglementProps,
} from "../../components/Character/Entanglement";

function mapStateToProps(state: IStoreState): IEntanglementProps {
  return {
    value: state.character.entanglement,
  };
}

export default connect(mapStateToProps)(Entanglement);
