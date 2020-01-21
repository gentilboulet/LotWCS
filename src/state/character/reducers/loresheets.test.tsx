import { ActionType } from "typesafe-actions";

import { testingStateFactory } from "../models/initial";
import { ICharacterState } from "../models/type";

import * as actions from "../actions/loresheets";
import { zeroCost } from "../models/costs";
import * as loresheets from "../models/loresheets";

import { globalReducer } from "../reducers/global";
import { loresheetsReducer } from "../reducers/loresheets";

import * as data from "../../../data/loresheets";

const initialState: ICharacterState = testingStateFactory();

const dataLoresheets = data.getLoresheets(data.isLoresheet);

describe("Testing loresheetsReducer", () => {
  it("should receive a LORESHEET_OPEN action", () => {
    dataLoresheets.forEach(dataLoresheet => {
      expect(
        loresheets.isLoresheetPresent(
          initialState.loresheets,
          dataLoresheet.uid
        )
      ).toBeFalsy();

      const action = actions.open(dataLoresheet.uid, zeroCost);
      const state = loresheetsReducer(initialState, action);
      expect(
        loresheets.isLoresheetPresent(state.loresheets, dataLoresheet.uid)
      ).toBeTruthy();
      expect(globalReducer(initialState, action)).toMatchObject(state);
    });
  });

  it("should receive LORESHEET_BUY_OPTION action", () => {
    dataLoresheets.forEach((loresheet: data.IDataLoresheet) => {
      const openLoresheetAction = actions.open(loresheet.uid, zeroCost);
      const stateWithLoresheet = loresheetsReducer(
        initialState,
        openLoresheetAction
      );
      expect(
        loresheets.isLoresheetPresent(
          stateWithLoresheet.loresheets,
          loresheet.uid
        )
      ).toBeTruthy();

      loresheet.options.forEach((option: data.IDataLoresheetOption) => {
        const buyOptionAction = actions.buyOption(
          loresheet.uid,
          option.uid,
          zeroCost
        );
        if (
          loresheets.canBuyLoresheetOption(
            stateWithLoresheet.loresheets,
            loresheet.uid,
            option.uid
          ) // to filter out ls options with prerequisites
        ) {
          const stateWithOption = loresheetsReducer(
            stateWithLoresheet,
            buyOptionAction
          );
          expect(
            loresheets.isLoresheetOptionPresent(
              stateWithOption.loresheets,
              loresheet.uid,
              option.uid
            )
          ).toBeTruthy();
        }
      });
    });
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(
      loresheetsReducer(initialState, junk as ActionType<typeof actions>)
    ).toMatchObject(initialState);
  });
});
