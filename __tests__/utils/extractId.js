import { responseDataIdToId } from '../../utils/extractId';
// See https://github.com/leebyron/testcheck-js/tree/master/integrations/jasmine-check
require('jasmine-check').install();

describe('responseDataIdToId', () => {
    check.it(
        'should correctly extract id from URLs beginning with http',
        gen.asciiString.notEmpty(),
        code => expect(responseDataIdToId(`https://goo.gl/${code}`)).toBe(code)
    );

    check.it(
        'should correctly extract id from URLs beginning with https',
        gen.asciiString.notEmpty(),
        code => expect(responseDataIdToId(`https://goo.gl/${code}`)).toBe(code)
    );
});