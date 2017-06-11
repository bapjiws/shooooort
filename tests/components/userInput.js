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

    wrapper.setState({ input: 'url' });
    t.is(wrapper.find('input[type="text"]').hasClass('text-input input-focus-incorrect'), true); // or simply input-focus-incorrect
    t.is(wrapper.contains(inputHelp), true);
    t.is(wrapper.find('svg').hasClass('incorrect-input-icon'), true);

});

test('UserInput w/ valid input should not show feedback, contain check icon and have "correct" style on focus', t => {
    const { wrapper, inputHelp } = t.context.data;

    wrapper.setState({ input: 'http://', inputIsValid: true });
    t.is(wrapper.find('input[type="text"]').hasClass('text-input input-focus-correct'), true); // or simply input-focus-correct
    t.is(wrapper.contains(inputHelp), false);
    t.is(wrapper.find('svg').hasClass('correct-input-icon'), true);
});