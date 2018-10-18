import * as React from 'react';

import Skill from 'containers/Character/Skill';
import Specialities from 'containers/Character/Specialities';
import { skills, TSkillName } from 'data/skills';

class Skills extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <div>{
        Object.keys(skills).map((name: TSkillName) => {
          return <div key={name} >
                  <div><Skill name={name} /></div>
                  <div><Specialities skill={name} /></div>
                </div>;
        })
      }</div>
    );
  }
}

export default Skills;
