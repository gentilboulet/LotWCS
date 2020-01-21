import { ICharacterAction as c } from "./actions/types";
import { ICharacterState as s } from "./models/type";
export { isCharacterAction, globalReducer } from "./reducers/global";
export { initialStateFactory } from "./models/initial";

export type ICharacterAction = c;
export type ICharacterState = s;
