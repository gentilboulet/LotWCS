import React, { useState } from "react";
import { Icon } from "react-fa";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardFooter, CardTitle } from "reactstrap";

import EditText from "../../components/EditText";
import { ARMOR_TYPE, getEffects } from "../../data/armor";
import { effectToString } from "../../perks/effects";
import { IStoreState } from "../../state";
import { armorBuy } from "../../state/actions/character/gear";
import { getCostArmor, ICost } from "../../state/models/character/costs";

const armorTypes: ARMOR_TYPE[] = ["Light Armor", "Medium Armor", "Heavy Armor"];
interface ICostListItem {
  type: ARMOR_TYPE;
  cost: ICost;
}

/* tslint:disable:no-shadowed-variable*/
export default function ArmorEdit() {
  const dispatch = useDispatch();
  const armorsName = useSelector((state: IStoreState) =>
    state.character.gear.armors.map(a => a.name),
  );

  const armorsCosts: ICostListItem[] = useSelector((state: IStoreState) =>
    armorTypes.map((type: ARMOR_TYPE) => {
      return { type, cost: getCostArmor(state.character, type) };
    }),
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(armorsCosts[0]);

  const notNull = (input: string) => input.length > 0;
  const nameUnique = (input: string) =>
    armorsName.findIndex(n => n === input) === -1 && notNull(input);

  const canBuy = () => {
    return notNull(description) && nameUnique(name) && type.cost.canPay;
  };

  const onClickAction = () =>
    dispatch(armorBuy(name, description, type.type, type.cost));

  const buyButton: JSX.Element = canBuy() ? (
    <Button color="success" onClick={onClickAction}>
      <Icon name="plus" />
    </Button>
  ) : (
    <Button color="error">
      <Icon name="plus" />
    </Button>
  );

  const onClickArmorType = (type: ICostListItem) => () => {
    setType(type);
  };
  const armorButtons: JSX.Element[] = armorsCosts.map((e, i) => {
    return (
      <Button
        key={"edit_" + i}
        color={e.type === type.type ? "primary" : "secondary"}
        onClick={onClickArmorType(e)}
      >
        {e.type}
      </Button>
    );
  });

  const onNameSubmit = (name: string) => {
    setName(name);
    canBuy();
  };
  const onDescriptionSubmit = (description: string) => {
    setDescription(description);
    canBuy();
  };

  return (
    <Card key={"armor edit"}>
      <CardBody>
        <CardTitle>
          <EditText
            header={"Name"}
            onSubmit={onNameSubmit}
            default={name}
            validate={nameUnique}
          />
        </CardTitle>
        {armorButtons}
        <EditText
          header={"Description"}
          onSubmit={onDescriptionSubmit}
          default={description}
          validate={notNull}
        />
        {getEffects(type.type).map((e, i) => (
          <p key={"e_" + i}>{effectToString(e)}</p>
        ))}
        <CardFooter>{buyButton}</CardFooter>
      </CardBody>
    </Card>
  );
}
