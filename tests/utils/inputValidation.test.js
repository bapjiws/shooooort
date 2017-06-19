import { inputIsValid } from '../../utils/inputValidation';

test('inputIsValid should detect URLs with both "http://" and "https://" prefixes', () => {
    expect(inputIsValid('http:/')).toBe(false);
    expect(inputIsValid('https:/')).toBe(false);
    expect(inputIsValid('http://')).toBe(true);
    expect(inputIsValid('https://')).toBe(true);
});