import React from "react";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

import { getEffects, WEAPON_TYPE } from "../../data/weapons";
import { effectToString } from "../../perks/effects";

interface IWeaponProps {
  name: string;
  description: string;
  type: WEAPON_TYPE;
}

/* tslint:disable-next-line:variable-name */
export const Weapon = (props: IWeaponProps) => {
  const effects = getEffects(props.type);
  return (
    <Card>
      <CardBody>
        <CardTitle>{props.name}</CardTitle>
        <CardSubtitle>{props.type}</CardSubtitle>
        <CardText>{props.description}</CardText>
      </CardBody>
      <CardBody>
        {effects.map((e, i) => (
          <CardText key={"e_" + i}>{effectToString(e)}</CardText>
        ))}
      </CardBody>
    </Card>
  );
};
