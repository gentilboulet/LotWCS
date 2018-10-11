import * as React from 'react';
import { CardBody, CardColumns } from 'reactstrap';

import { externalKungfu, IDataExternalKungfu, IDataExternalKungfuTechnique } from 'data/kungfu';

import CollectionCard from 'components/CollectionCard';
import ExternalKungFuTechnique from 'containers/Character/ExternalKungFuTechnique';

interface IExternalKungFuTechniquesProps {
  styleUid: string;
  knownTechniques: string[];
}

class ExternalKungFuTechniques extends React.PureComponent<IExternalKungFuTechniquesProps, {}> {
  constructor(props: IExternalKungFuTechniquesProps) {
    super(props);

    this.renderTechniques = this.renderTechniques.bind(this);
  }
  public render() {
    const kungfu = externalKungfu.find((kf: IDataExternalKungfu) => kf.uid === this.props.styleUid);
    if(kungfu === undefined) { return ;}
    return <CardBody><CardColumns>{this.renderTechniques(kungfu)}</CardColumns></CardBody>;
  }

  private renderTechniques(style: IDataExternalKungfu) {
    return style.techniques.map((dataTechnique: IDataExternalKungfuTechnique) => {
      if(-1 !== this.props.knownTechniques.findIndex((techUid) => techUid === dataTechnique.uid)) {
        return this.renderKnownExternalKungFuTechnique(dataTechnique);
      } else {
      return this.renderOpenExternalKungFuTechnique(dataTechnique);
      }
    });
  }

  private renderKnownExternalKungFuTechnique(dataTechnique: IDataExternalKungfuTechnique) {
    return <CollectionCard
      key={'known_'+dataTechnique.uid}
      header={dataTechnique.name}
      text={dataTechnique.description}
    />;
  }

  private renderOpenExternalKungFuTechnique(dataTechnique: IDataExternalKungfuTechnique) {
    return <ExternalKungFuTechnique key={dataTechnique.uid} styleUid={this.props.styleUid} uid={dataTechnique.uid} />
  }
}

export default ExternalKungFuTechniques;
