import test from 'ava';
import { responseDataIdToId } from '../../utils/extractId';

test('responseDataIdToId should correctly extract id from URLs beginning with both http and https', t => {
    t.is(responseDataIdToId('http://goo.gl/s0m31d'), 's0m31d');
    t.is(responseDataIdToId('https://goo.gl/an0th3r1d'), 'an0th3r1d');
});