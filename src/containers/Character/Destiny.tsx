import { connect } from "react-redux";

import { IStoreState } from "../../state/type";

import Destiny, { IDestinyProps } from "../../components/Character/Destiny";

function mapStateToProps(state: IStoreState): IDestinyProps {
  return {
    value: state.destiny
  };
}

export default connect(mapStateToProps)(Destiny);
