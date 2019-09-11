import { testingStateFactory } from "../initial";
import { IStoreState } from "../type";

import * as loresheetsActions from "../actions/loresheets";
import { zeroCost } from "../costs";
import * as loresheets from "../loresheets";

import { globalReducer } from "../reducers/global";
import { loresheetsReducer } from "../reducers/loresheets";

import * as data from "../../data/loresheets";

const initialState: IStoreState = testingStateFactory();

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

      const action = loresheetsActions.open(dataLoresheet.uid, zeroCost);
      const state = loresheetsReducer(initialState, action);
      expect(
        loresheets.isLoresheetPresent(state.loresheets, dataLoresheet.uid)
      ).toBeTruthy();
      expect(globalReducer(initialState, action)).toMatchObject(state);
    });
  });

  it("should receive LORESHEET_BUY_OPTION action", () => {
    dataLoresheets.forEach(loresheet => {
      const openLoresheetAction = loresheetsActions.open(
        loresheet.uid,
        zeroCost
      );
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

      loresheet.options.forEach(option => {
        const buyOption = loresheetsActions.buyOption(
          loresheet.uid,
          option.uid,
          zeroCost
        );
        if (
          !loresheets.canBuyLoresheetOption(
            stateWithLoresheet.loresheets,
            loresheet.uid,
            option.uid
          )
        ) {
          expect(() =>
            loresheetsReducer(stateWithLoresheet, buyOption)
          ).toThrow();
        } else {
          const state = loresheetsReducer(stateWithLoresheet, buyOption);
          expect(
            loresheets.isLoresheetOptionPresent(
              state.loresheets,
              loresheet.uid,
              option.uid
            )
          ).toBeTruthy();
          expect(globalReducer(stateWithLoresheet, buyOption)).toMatchObject(
            state
          );
        }
      });
    });
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(
      loresheetsReducer(
        initialState,
        junk as loresheetsActions.ILoresheetAction
      )
    ).toMatchObject(initialState);
  });
});
