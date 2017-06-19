import { responseDataIdToId } from '../../utils/extractId';

test('responseDataIdToId should correctly extract id from URLs beginning with both http and https', () => {
    expect(responseDataIdToId('http://goo.gl/s0m31d')).toBe('s0m31d');
    expect(responseDataIdToId('https://goo.gl/an0th3r1d')).toBe('an0th3r1d');
});