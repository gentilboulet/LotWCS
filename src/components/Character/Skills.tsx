import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import Skill from 'containers/Character/Skill';
import { skills, TSkillName } from 'data/skills';

class Skills extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <Container>{
        Object.keys(skills).map((name: TSkillName) => {
          return <Row key={name}>
                  <Col>
                    <Skill name={name} />
                  </Col>
                </Row>;
        })
      }</Container>
    );
  }
}

export default Skills;
