import { connect } from "react-redux";

import { IStoreState } from "../../state/type";

import Entanglement, {
  IEntanglementProps
} from "../../components/Character/Entanglement";

function mapStateToProps(state: IStoreState): IEntanglementProps {
  return {
    value: state.entanglement
  };
}

export default connect(mapStateToProps)(Entanglement);
