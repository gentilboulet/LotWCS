import * as effects from './effects';

describe('Testing effect creators', () => {
  test('should create a combat statistic effect', () => {
    const e = effects.combatStatistic('strike', 10);
    expect( e.increase ).toBe(10);
    expect( e.statistic ).toBe('strike');
    expect( e ).toMatchSnapshot();
  });

  test('should create a conditional text effect', () => {
    const lipsum = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Maecenas justo sapien, posuere at malesuada nec, dictum congue sapien.'
    ];
    const e = effects.conditionalText(lipsum);
    expect( e.text ).toEqual(lipsum);
    expect( e ).toMatchSnapshot();
  });

  test('should create a single line conditional text effect', () => {
    const lipsum = 'Lorem ipsum dolor sit amet.';
    const e = effects.conditionalOnelineText(lipsum);
    expect( e.text ).toEqual(new Array(lipsum) );
    expect( e ).toMatchSnapshot();
  });

  test('should not create a conditional text effect with an empty text', () => {
    expect( () => effects.conditionalText([]) ).toThrow();
    expect( () => effects.conditionalOnelineText('') ).toThrow();
  });

  test('should create an increase base chi for threshold effect', () => {
    const e = effects.increaseBaseChiForThreshold(123);
    expect( e.chiIncrease ).toBe(123);
    expect( e ).toMatchSnapshot();
  });
});
