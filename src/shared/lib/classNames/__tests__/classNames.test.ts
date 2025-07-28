import { classNames } from '../../classNames/classNames';

describe('classNames', () => {
  test('Only with first param', () => {
    expect(classNames('testClass')).toBe('testClass');
  });

  test('With additional classes', () => {
    const expectedResult = 'testClass testClass1 testClass2';
    expect(classNames('testClass', {}, ['testClass1', 'testClass2'])).toBe(expectedResult);
  });

  test('With modifications', () => {
    const expectedResult = 'testClass testClass1 testClass2 hovered disabled';
    expect(classNames('testClass', { hovered: true, disabled: true }, ['testClass1', 'testClass2'])).toBe(expectedResult);
  });

  test('Modification with false value', () => {
    const expectedResult = 'testClass testClass1 testClass2 hovered';
    expect(classNames('testClass', { hovered: true, disabled: false }, ['testClass1', 'testClass2'])).toBe(expectedResult);
  });

  test('Modifications with undefined', () => {
    const expectedResult = 'testClass testClass1 testClass2';
    expect(classNames('testClass', { hovered: undefined, disabled: false }, ['testClass1', 'testClass2'])).toBe(expectedResult);
  });

  test('Modifications full empty values', () => {
    const expectedResult = '';
    expect(classNames('', {}, [])).toBe(expectedResult);
  });
});
