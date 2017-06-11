import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

// Import the unconnected version -- see http://redux.js.org/docs/recipes/WritingTests.html#connected-components
import { UserInput } from '../../src/components/UserInput';

test.beforeEach(t => {
    t.context.data = {
        wrapper: shallow(<UserInput />),
        inputHelp: <div className="text-validation-help input-help">Links should start with "http://" or "https://"</div>
    }
});

test('UserInput w/ invalid input should show feedback, cross icon and have "incorrect" style on focus', t => {
    const { wrapper, inputHelp } = t.context.data;

    t.is(wrapper.find('input[type="text"]').hasClass('text-input'), true);

    'http:/'.split('').reduce((acc, curr) => {
        acc += curr;
        wrapper.find('input[type="text"]').simulate('change', { target: { value: acc } });

        t.is(wrapper.state('input'), acc);
        t.is(wrapper.find('input[type="text"]').hasClass('text-input input-focus-incorrect'), true);
        t.is(wrapper.contains(inputHelp), true);
        t.is(wrapper.find('svg').hasClass('incorrect-input-icon'), true);
        return acc;
    }, '');
});

test('UserInput w/ valid input should not show feedback, contain check icon and have "correct" style on focus', t => {
    const { wrapper, inputHelp } = t.context.data;

    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'http://' } });

    t.is(wrapper.find('input[type="text"]').hasClass('text-input input-focus-correct'), true); // or simply input-focus-correct
    t.is(wrapper.contains(inputHelp), false);
    t.is(wrapper.find('svg').hasClass('correct-input-icon'), true);
});

test.skip('UserInput should dispatch action, blur on Enter w/ valid input and clear the input field', t => {
    const { wrapper } = t.context.data;

    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'http://' } });
    t.is(wrapper.state('input'), 'http://');
    wrapper.find('input[type="text"]').simulate('keyDown', {key: 'Enter', keyCode: 13});
    t.is(wrapper.state('input'), '');

    // TODO: props.shortenLink should be called -- create spy and pass mock store or wrap into Provider
    // TODO: check if text input no longer has focus
});