import * as actions from './header';

describe('Testing header action creators', () => {
  it('should create a set name action', () => {
    const name = 'New Name';
    const a = actions.setName(name);
    expect( a.name ).toBe(name);
    expect( a ).toMatchSnapshot();
  });

  it('should create a set concept action', () => {
    const concept = 'New Concept';
    const a = actions.setConcept( concept );
    expect( a.concept ).toBe(concept);
    expect( a ).toMatchSnapshot();
  });

  it('should create a set archetype action', () => {
    const archetype = 'doctor';
    const a = actions.setArchetype(archetype);
    expect( a.archetype ).toBe(archetype);
    expect( a ).toMatchSnapshot();
  });

  it('should not create an invalid set archetype action', () => {
    expect( () => actions.setArchetype('pro golfer') ).toThrow();
  });

  it('should create a set rank action', () => {
    const rank = '4th_rank';
    const a = actions.setRank(rank);
    expect( a.rank ).toBe(rank);
    expect( a ).toMatchSnapshot();
  });

  it('should not create an invalid set rank action', () => {
    expect( () => actions.setRank('ultimate rank') ).toThrow();
  });
});

