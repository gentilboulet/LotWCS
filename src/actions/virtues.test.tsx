import * as actions from './virtues';
import * as dataVirtues from '../data/virtues';

describe('Testing virtue action creator', () => {
  const noCost = {
    destiny: 0, entanglement: 0,
    discountIdx: -1, discountNewValue: 0
  };

  dataVirtues.virtues.map((data: dataVirtues.IDataVirtue) => {
    it('should create a virtue increase action with an existing virtue', () => {
      const virtueType = data.type;
      const name = data.name;
      const a = actions.increase(name, virtueType, 10, noCost);
      expect( a.name ).toBe(name);
      expect( a.virtueType ).toBe(virtueType);
      expect( a.value ).toBe(10);
      expect( a ).toMatchSnapshot();
    });
  });

  it('should create a virtue increase action with a non existing virtue', () => {
    const virtueType = dataVirtues.VIRTUE_SELFISH;
    const name = 'New virtue name';
    const a = actions.increase(name, virtueType, 3, noCost);
    expect( a.name ).toBe(name);
    expect( a.virtueType ).toBe(virtueType);
    expect( a.value ).toBe(3);
    expect( a ).toMatchSnapshot();
  });
});
