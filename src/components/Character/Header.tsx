import * as React from 'react';

import DDLText from 'components/DDLText';
import EditText from 'components/EditText';
import StaticText from 'components/StaticText';

import * as dataArchetypes from 'data/archetypes';
import * as dataRanks from 'data/ranks';

export interface IHeaderProps {
  name: string | undefined;
  concept: string | undefined;
  archetype: string | undefined;
  rank: {name: string, value: number}| undefined;
  destiny: number;
  entanglement: number;

  onSetName: (s: string) => void;
  onSetConcept: (s: string) => void;
  onSetArchetype: (s: string) => void;
  onSetRank: (s: string) => void;

  lockArchetype: boolean;
  lockRank: boolean;
}

import './Character.css';

class Header extends React.PureComponent<IHeaderProps, {}> {
  public render() {
    return (
      <div className="Character-header">
        <EditText
          header="Character Name"
          default={this.props.name}
          validate={this.isStringNotNull}
          onSubmit={this.props.onSetName}
        />
        <EditText
          header="Character Concept"
          default={this.props.concept}
          validate={this.isStringNotNull}
          onSubmit={this.props.onSetConcept}
        />
        <DDLText
          header="Character Archetype"
          default={this.props.archetype}
          values={dataArchetypes.archetypes
            .sort((a: dataArchetypes.IDataArchetype, b: dataArchetypes.IDataArchetype) => {
              if(a.name < b.name) { return -1; }
              if(a.name > b.name) { return 1; }
              return 0;
            })
            .map( (a: dataArchetypes.IDataArchetype) => ({ label: a.name, key: a.key}) )}
          onSubmit={this.props.onSetArchetype}
          locked={this.props.lockArchetype}
        />
        <DDLText
          header="Character Rank"
          default={this.props.rank ? this.props.rank.name : '' }
          values={dataRanks.ranks.map( ({name: n, key: k}) => ({ label: n, key: k}) )}
          onSubmit={this.props.onSetRank}
          locked={this.props.lockRank}
        />
        <StaticText
          header="Destiny"
          value={this.props.destiny.toString()}
        />
        <StaticText
          header="Entanglement"
          value={this.props.entanglement.toString()}
        />
      </div>
    );
  }

  private isStringNotNull(s: string): boolean { return s.trim().length > 0; };
}

export default Header;
