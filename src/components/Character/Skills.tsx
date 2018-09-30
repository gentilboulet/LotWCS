import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import Skill from 'containers/Character/Skill';
import Specialities from 'containers/Character/Specialities';
import { skills, TSkillName } from 'data/skills';

const styles = {
  row: {
    alignItems: 'center',
    height: 56,
  }
}

class Skills extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <Container style={styles}>{
        Object.keys(skills).map((name: TSkillName) => {
          return <Row key={name} style={styles.row}>
                  <Col><Skill name={name} /></Col>
                  <Col><Specialities skill={name} /></Col>
                </Row>;
        })
      }</Container>
    );
  }
}

export default Skills;
