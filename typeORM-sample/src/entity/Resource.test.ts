import { isValidKey } from './Resource';

describe('isValidKey', () => {
  test('Valid usage.', () => {
    expect(isValidKey('samplekey')).toBeTruthy();
    expect(isValidKey('sample-key')).toBeTruthy();
    expect(isValidKey('sample-key-1')).toBeTruthy();
    expect(isValidKey('1-sample-key')).toBeTruthy();
  });
  test('Unvalid usage.', () => {
    expect(isValidKey('Samplekey')).toBeFalsy();
    expect(isValidKey('sample_key')).toBeFalsy();
    expect(isValidKey('sample!key')).toBeFalsy();
  });
});
