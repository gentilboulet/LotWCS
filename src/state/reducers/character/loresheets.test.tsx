import { ActionType } from "typesafe-actions";

import * as actions from "../../actions/character/loresheets";
import { zeroCost } from "../../models/character/costs";
import * as loresheets from "../../models/character/loresheets";
import { loresheetsReducer } from "../../reducers/character/loresheets";

import * as data from "../../../data/loresheets";

const initialState = loresheets.createState();

const dataLoresheets = data.getLoresheets(data.isLoresheet);

describe("Testing loresheetsReducer", () => {
  it("should receive a LORESHEET_OPEN action", () => {
    dataLoresheets.forEach(dataLoresheet => {
      expect(
        loresheets.isLoresheetPresent(initialState, dataLoresheet.uid),
      ).toBeFalsy();

      const action = actions.open(dataLoresheet.uid, zeroCost);
      const state = loresheetsReducer(initialState, action);
      expect(
        loresheets.isLoresheetPresent(state, dataLoresheet.uid),
      ).toBeTruthy();
    });
  });

  it("should receive LORESHEET_BUY_OPTION action", () => {
    dataLoresheets.forEach((loresheet: data.IDataLoresheet) => {
      const openLoresheetAction = actions.open(loresheet.uid, zeroCost);
      const stateWithLoresheet = loresheetsReducer(
        initialState,
        openLoresheetAction,
      );
      expect(
        loresheets.isLoresheetPresent(stateWithLoresheet, loresheet.uid),
      ).toBeTruthy();

      loresheet.options.forEach((option: data.IDataLoresheetOption) => {
        const buyOptionAction = actions.buyOption(
          loresheet.uid,
          option.uid,
          zeroCost,
        );
        if (
          loresheets.canBuyLoresheetOption(
            stateWithLoresheet,
            loresheet.uid,
            option.uid,
          ) // to filter out ls options with prerequisites
        ) {
          const stateWithOption = loresheetsReducer(
            stateWithLoresheet,
            buyOptionAction,
          );
          expect(
            loresheets.isLoresheetOptionPresent(
              stateWithOption,
              loresheet.uid,
              option.uid,
            ),
          ).toBeTruthy();
        }
      });
    });
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(
      loresheetsReducer(initialState, junk as ActionType<typeof actions>),
    ).toMatchObject(initialState);
  });
});
