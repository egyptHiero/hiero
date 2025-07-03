import { combineWithDefaults } from '../index';

describe('combineWithDefaults', () => {
  it('should proceed correctly with empty values', () => {
    expect(combineWithDefaults()).toStrictEqual({});
    expect(combineWithDefaults({})).toStrictEqual({});
    expect(combineWithDefaults(undefined, {})).toStrictEqual({});
    expect(combineWithDefaults({}, {})).toStrictEqual({});
  });
  it('should override the default value with non-empty value', () => {
    expect(combineWithDefaults({ a: 1 })).toStrictEqual({ a: 1 });
    expect(combineWithDefaults({ a: 1 }, { a: 2 })).toStrictEqual({ a: 1 });
  });
  it('should allow to extra properties without default values', () => {
    expect(combineWithDefaults({ a: 1, b: 1 })).toStrictEqual({ a: 1, b: 1 });
    expect(combineWithDefaults({ a: 1, b: 1 }, { a: 2 })).toStrictEqual({
      a: 1,
      b: 1,
    });
  });
  it('should use default values when no property defined', () => {
    expect(combineWithDefaults(undefined, { a: 2, c: 2 })).toStrictEqual({
      a: 2,
      c: 2,
    });
    expect(combineWithDefaults({ a: 1, b: 1 }, { a: 2, c: 2 })).toStrictEqual({
      a: 1,
      b: 1,
      c: 2,
    });
  });
  it('should use default values when defined property is empty', () => {
    expect(
      combineWithDefaults({ a: undefined, b: null }, { a: 2, b: 2 as unknown })
    ).toStrictEqual({ a: 2, b: 2 });
  });
  it('should use values when defined property is not empty, but !value is false', () => {
    expect(
      combineWithDefaults({ a: '', b: false, c: 0 }, { a: 's', c: 2 })
    ).toStrictEqual({ a: '', b: false, c: 0 });
  });
});
