import * as React from 'react';
import { CardBody, CardColumns } from 'reactstrap';

import { IDataLoresheet, IDataLoresheetOption, loresheets } from 'data/loresheets';

import CollectionCard from 'components/CollectionCard';
import LoresheetOption from 'containers/Character/LoresheetOption';

interface ILoresheetOptionsProps {
  lsUid: string;
  knownOptions: Array<{ uid: string, payload?: any }>;
}

class LoresheetOptions extends React.PureComponent<ILoresheetOptionsProps, {}> {
  constructor(props: ILoresheetOptionsProps) {
    super(props);

    this.renderOptions = this.renderOptions.bind(this);
  }
  public render() {
    const loresheet = loresheets.find((ls: IDataLoresheet) => ls.uid === this.props.lsUid);
    if(loresheet === undefined) { return ;}
    return <CardBody><CardColumns>{this.renderOptions(loresheet)}</CardColumns></CardBody>;
  }

  private renderOptions(loresheet: IDataLoresheet): JSX.Element {
    const returns: any = [];
    loresheet.options.forEach((dataOption: IDataLoresheetOption) => {
      let knownIndex = -1;
        this.props.knownOptions.filter((knownOption) => knownOption.uid === dataOption.uid)
        .forEach((knownOption, index) => {
          knownIndex = index;
          returns.push(this.renderKnownLoresheetOption(dataOption, knownOption, index));
        });
        if(knownIndex === -1 || dataOption.repeatable) {
          returns.push(this.renderOpenLoresheetOption(dataOption));
        }
    });
    return returns;
  }

  private renderKnownLoresheetOption(dataOption: IDataLoresheetOption, knownOption: {uid: string, payload?: any}, index: number) {
    return <CollectionCard
      key={'known_'+knownOption.uid+'_'+index}
      header={dataOption.type}
      footer={JSON.stringify(knownOption.payload)}
      text={dataOption.description}
    />;
  }

  private renderOpenLoresheetOption(dataOption: IDataLoresheetOption) {
    return <LoresheetOption key={dataOption.uid} lsUid={this.props.lsUid} uid={dataOption.uid} />
  }
}

export default LoresheetOptions;
