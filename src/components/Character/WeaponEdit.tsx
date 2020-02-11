import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardFooter, CardTitle } from "reactstrap";

import EditText from "../../components/EditText";
import { getEffects, weapons, WEAPON_TYPE } from "../../data/weapons";
import { effectToString } from "../../perks/effects";
import { IStoreState } from "../../state";
import { weaponBuy } from "../../state/actions/character/gear";
import { getCostWeapon, ICost } from "../../state/models/character/costs";

type OneWeapon = [WEAPON_TYPE];
type TwoWeapon = [WEAPON_TYPE, WEAPON_TYPE];
type WeaponTypes = OneWeapon | TwoWeapon;

/* tslint:disable:no-shadowed-variable*/
export default function WeaponEdit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [types, setTypes] = useState<WEAPON_TYPE[]>(["Flexible"]);

  const dispatch = useDispatch();
  const weaponsName = useSelector((state: IStoreState) =>
    state.character.gear.weapons.map(a => a.name),
  );

  const cost: ICost | undefined = useSelector((state: IStoreState) =>
    types.length < 1 || types.length > 2
      ? undefined
      : getCostWeapon(state.character, types),
  );

  const notNull = (input: string) => input.length > 0;
  const nameUnique = (input: string) =>
    weaponsName.findIndex(n => n === input) === -1 && notNull(input);

  const canBuy = () => {
    return notNull(description) && nameUnique(name) && cost && cost.canPay;
  };

  const onClickAction = () => {
    if (cost)
      dispatch(weaponBuy(name, description, types as WeaponTypes, cost));
  };

  const buyButton: JSX.Element = canBuy() ? (
    <Button color="success" onClick={onClickAction}>
      <FontAwesomeIcon icon="plus" />
    </Button>
  ) : (
    <Button color="error">
      <FontAwesomeIcon icon="plus" />
    </Button>
  );

  const onClickWeaponType = (type: WEAPON_TYPE) => () => {
    if (types.indexOf(type) !== -1) {
      const copy = Array.from(types.filter(t => t !== type));
      setTypes(copy);
    } else {
      const copy = Array.from(types);
      if (copy.length > 1) copy.shift(); // only 2
      copy.push(type);
      setTypes(copy);
    }
  };
  const weaponButtons: JSX.Element[] = weapons
    .map(w => w.type)
    .map((w, i) => {
      const isInTypes = -1 !== types.findIndex(t => w === t);
      return (
        <Button
          key={"edit_" + i}
          color={isInTypes ? "primary" : "secondary"}
          onClick={onClickWeaponType(w)}
        >
          {w}
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

  const typesToShow = Array.from(types);
  typesToShow.sort();

  return (
    <Card key={"weapon edit"}>
      <CardBody>
        <CardTitle>
          <EditText
            header={"Name"}
            onSubmit={onNameSubmit}
            default={name}
            validate={nameUnique}
          />
        </CardTitle>
        {weaponButtons}
        <EditText
          header={"Description"}
          onSubmit={onDescriptionSubmit}
          default={description}
          validate={notNull}
        />
        {typesToShow
          .sort()
          .flatMap(type => getEffects(type))
          .map((e, i) => (
            <p key={"e_" + i}>{effectToString(e)}</p>
          ))}
        <CardFooter>{buyButton}</CardFooter>
      </CardBody>
    </Card>
  );
}
