import { inputIsValid } from '../../utils/inputValidation';

describe('inputIsValid', () => {
    it('should correctly detect URL with "http://" prefix', () => {
        expect(inputIsValid('http:/')).toBe(false);
        expect(inputIsValid('http://')).toBe(true);
    });

    it('should correctly detect URL with "https://" prefix', () => {
        expect(inputIsValid('https:/')).toBe(false);
        expect(inputIsValid('https://')).toBe(true);
    });
});