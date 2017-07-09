import { responseDataIdToId } from '../../utils/extractId';
// See https://github.com/leebyron/testcheck-js/tree/master/integrations/jasmine-check
require('jasmine-check').install();

describe('responseDataIdToId', () => {
    check.it(
        'should correctly extract id from URLs beginning with http or https',
        gen.asciiString.notEmpty(), gen.oneOf(['http', 'https']),
        (code, protocol) => expect(responseDataIdToId(`${protocol}://goo.gl/${code}`)).toBe(code));
});