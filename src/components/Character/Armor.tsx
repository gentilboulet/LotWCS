import React from "react";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

import { ARMOR_TYPE, getEffects } from "../../data/armor";
import { effectToString } from "../../perks/effects";

interface IArmorProps {
  name: string;
  description: string;
  type: ARMOR_TYPE;
}

export const Armor = (props: IArmorProps) => {
  const effects = getEffects(props.type);
  return (
    <Card>
      <CardBody>
        <CardTitle>{props.name}</CardTitle>
        <CardSubtitle>{props.type}</CardSubtitle>
        <CardText>{props.description}</CardText>
      </CardBody>
      <CardBody>
        {effects.map(e => (
          <CardText>{effectToString(e)}</CardText>
        ))}
      </CardBody>
    </Card>
  );
};