import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import {
  Badge,
  Card,
  CardBody,
  CardDeck,
  CardText,
  CardTitle,
} from "reactstrap";

import { IStoreState } from "../../state";
import ArmorEdit from "./ArmorEdit";
import WeaponEdit from "./WeaponEdit";

/* tslint:disable-next-line:variable-name */
export const Gear = () => {
  const armors = useSelector(
    (state: IStoreState) => state.character.gear.armors,
  );
  const weapons = useSelector(
    (state: IStoreState) => state.character.gear.weapons,
  );

  const render = (name: string, description: string, types: string[]) => (
    <Card key={name}>
      <CardBody>
        <CardTitle>
          <h4>{name}</h4>
          <Button>
            <FontAwesomeIcon icon="pen" />
          </Button>
        </CardTitle>
        <CardText>{description}</CardText>
        <CardText>
          {types.map((type, i) => (
            <Badge color="info" pill={true} key={"t_" + i}>
              {type}
            </Badge>
          ))}
        </CardText>
      </CardBody>
    </Card>
  );

  return (
    <div>
      <div>
        <div className="Grid">
          <div className="Grid-cell">
            <h3>Armors :</h3>
          </div>
        </div>
        <CardDeck>
          {armors.map(armor =>
            render(armor.name, armor.description, [armor.type]),
          )}
          <ArmorEdit />
        </CardDeck>
      </div>
      <div>
        <div className="Grid">
          <div className="Grid-cell">
            <h3>Weapons :</h3>
          </div>
        </div>
        <CardDeck>
          {weapons.map(weapon =>
            render(weapon.name, weapon.description, weapon.type),
          )}
          <WeaponEdit />
        </CardDeck>
      </div>
    </div>
  );
};
