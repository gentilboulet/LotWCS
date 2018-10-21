import * as React from "react";

import Skill from "containers/Character/Skill";
import Specialities from "containers/Character/Specialities";
import { skills, TSkillName } from "data/skills";

import "./Skills.css";

class Skills extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <ul className="skills-list">
        {Object.keys(skills).map((name: TSkillName) => {
          return (
            <li key={name} className="Grid">
              <div className="Grid-cell">
                <Skill name={name} />
              </div>
              <div className="Grid-cell">
                <Specialities skill={name} />
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Skills;
