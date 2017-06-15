import test from 'ava';
import { inputIsValid } from '../../utils/inputValidation';

test('inputIsValid should detect URLs with both "http://" and "https://" prefixes', t => {
    t.is(inputIsValid('http:/'), false);
    t.is(inputIsValid('https:/'), false);
    t.is(inputIsValid('http://'), true);
    t.is(inputIsValid('https://'), true);
});