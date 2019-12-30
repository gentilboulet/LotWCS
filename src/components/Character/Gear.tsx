import React from "react";
import { Icon } from "react-fa";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import {
  Badge,
  Card,
  CardBody,
  CardDeck,
  CardText,
  CardTitle
} from "reactstrap";

import { IStoreState } from "../../state/type";

export const Gear = () => {
  const armors = useSelector((state: IStoreState) => state.gear.armors);
  const weapons = useSelector((state: IStoreState) => state.gear.weapons);

  const render = (name: string, description: string, types: string[]) => (
    <Card>
      <CardBody>
        <CardTitle>
          <h4>{name}</h4>
          <Button>
            <Icon name="times" />
          </Button>
        </CardTitle>
        <CardText>{description}</CardText>
        <CardText>
          {types.map(type => (
            <Badge color="info" pill={true}>
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
          <div className="Grid-cell">
            <Button color="success">
              <Icon name="plus" />
            </Button>
          </div>
        </div>
        <CardDeck>
          {armors.map(armor =>
            render(armor.name, armor.description, [armor.type])
          )}
        </CardDeck>
      </div>
      <div>
        <div className="Grid">
          <div className="Grid-cell">
            <h3>Weapon :</h3>
          </div>
          <div className="Grid-cell">
            <Button color="success">
              <Icon name="plus" />
            </Button>
          </div>
        </div>
        <CardDeck>
          {weapons.map(weapon =>
            render(weapon.name, weapon.description, weapon.type)
          )}
        </CardDeck>
      </div>
    </div>
  );
};
