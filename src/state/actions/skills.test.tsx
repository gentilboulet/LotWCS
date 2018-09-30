import * as actions from './skills';

describe('Testing for skill action creators', () => {
  const noCost = {
    destiny: 0,
    discountIdx: -1, discountNewValue: 0,
    entanglement: 0
  };

  it('should create a buy skill action', () => {
    const skill = 'Awareness';
    const a = actions.skillsBuy(skill, noCost);
    expect( a.name ).toBe(skill);
  });

  it('should create a buy speciality action', () => {
    const skill = 'Awareness';
    const speciality = 'Hear';
    const a = actions.skillSpecialityBuy(skill, speciality, noCost);
    expect( a.skill ).toBe(skill);
    expect( a.speciality ).toBe(speciality);
    expect( a ).toMatchSnapshot();
  });

  it('should not create a buy speciality action on an invalid speciality', () => {
    const skill = 'Awareness';
    const speciality = '';
    expect( () => actions.skillSpecialityBuy(skill, speciality, noCost) ).toThrow();
  });
});
