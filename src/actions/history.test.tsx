import * as actions from './history';

describe('Testing history action creators', () => {
  it('should create an history delete action', () => {
    const id = 12;
    const a = actions.historyDeleteUpTo(id);
    expect( a.id ).toBe(id);
    expect( a ).toMatchSnapshot();
  });
});
