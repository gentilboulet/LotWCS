import { IAutomaticCondition } from "./automatics";
import { IBonus } from "./bonuses";
import { IDiscount } from "./discounts";
import { IEffect } from "./effects";

export type IPerk = IAutomaticCondition | IBonus | IDiscount | IEffect;
