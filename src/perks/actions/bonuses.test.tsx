import * as bonuses from './bonuses';
import * as dataChi from 'data/chi';

describe('Testing bonus creators', () => {
  it('should create a destiny bonus', () => {
    const b = bonuses.destiny(10);
    expect( b.value ).toBe(10);
    expect( b ).toMatchSnapshot();
  });

  it('should create an entanglement bonus', () => {
    const b = bonuses.entanglement(10);
    expect( b.value ).toBe(10);
    expect( b ).toMatchSnapshot();
  });

  it('should create an chi bonus', () => {
    const chiName = 'fire';
    const b = bonuses.chi(10, chiName);
    expect( b.value ).toBe(10);
    expect( b.chi ).toBe(chiName);
    expect( b ).toMatchSnapshot();
  });

  it('should not create an invalid chi bonus', () => {
    const chiName = 'garbage';
    expect( () => bonuses.chi(10, chiName as dataChi.IChiNames) ).toThrow();
  })

  it('should create an cultivation bonus', () => {
    const cultivationName = dataChi.fromChiToCultivationName('fire');
    const b = bonuses.cultivation(10, cultivationName);
    expect( b.value ).toBe(10);
    expect( b.cultivation ).toBe(cultivationName);
    expect( b ).toMatchSnapshot();
  });

  it('should not create an invalid cultivation bonus', () => {
    const cultivationName = 'garbageCultivation';
    expect( () => bonuses.cultivation(10, cultivationName as dataChi.IChiCultivations) ).toThrow();
  });

  it('should create an oneAmongN bonus', () => {
    const bonusesList = [
      bonuses.entanglement(10),
      bonuses.destiny(10),
    ];

    const b = bonuses.oneAmongN(bonusesList);
    expect( b ).toMatchSnapshot();
  });

  it('should not create an oneAmongN bonus with only one bonus but give the bonus back', () => {
    const bonusesList = [
      bonuses.destiny(10),
    ];

    const b = bonuses.oneAmongN(bonusesList);
    expect( b ).toMatchObject(bonusesList[0]);
    expect( b ).toMatchSnapshot();
  })

  it('should not create an oneAmongN bonus with an empty set of bonuses', () =>{
    expect( () => bonuses.oneAmongN([]) ).toThrow();
  });

  it('should create an skill rank bonus', () => {
    const skillName = 'Awareness';
    const b = bonuses.skillRank(skillName);
    expect( b.skill ).toBe(skillName);
    expect( b ).toMatchSnapshot();
  });

  it('should not create an invalid skill rank bonus', () => {
    const skillName = 'error';
    expect( () => bonuses.skillRank(skillName) ).toThrow();
  });

  it('should create a skill speciality bonus', () => {
    const skillName = 'Awareness';
    const specialityName = 'Hear';
    const b = bonuses.speciality(skillName, specialityName);
    expect( b.skill ).toBe(skillName);
    expect( b.speciality ).toBe(specialityName);
    expect( b ).toMatchSnapshot();
  });

  it('should not create an invalid skill speciality bonus', () => {
    const skillName = 'Error is my name';
    const specialityName = 'Hear';
    expect( () => bonuses.speciality(skillName, specialityName) ).toThrow();
  });

  it('should create a skill with a not in data speciality bonus', () => {
    const skillName = 'Awareness';
    const specialityName = 'Totally not in data speciality';
    const b = bonuses.speciality(skillName, specialityName);
    expect( b.skill ).toBe(skillName);
    expect( b.speciality ).toBe(specialityName);
    expect( b ).toMatchSnapshot();
  });
});
