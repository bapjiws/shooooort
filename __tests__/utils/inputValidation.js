import { inputIsValid } from '../../utils/inputValidation';
// See https://github.com/leebyron/testcheck-js/tree/master/integrations/jasmine-check
require('jasmine-check').install();

describe('inputIsValid', () => {
    check.it(
        'should correctly detect URLs with "http://" or "https://" prefix',
        gen.oneOf(['http://', 'https://']), gen.asciiString.notEmpty(),
        (prefix, body) => expect(inputIsValid(prefix + body)).toBe(true)
    );

    check.it(
        'should correctly detect URLs without "http://" or "https://" prefix',
        gen.asciiString.notEmpty().suchThat(str => str !== 'http://' && str !== 'https://'), gen.asciiString.notEmpty(),
        (prefix, body) => expect(inputIsValid(prefix + body)).toBe(false)
    );
});