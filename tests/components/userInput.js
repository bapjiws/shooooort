import test from 'ava';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import browserEnv from 'browser-env';
browserEnv();

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

test('can query for DOM elements', t => {
    document.body.innerHTML = '<p>Hello, world</p>';
    const para = document.querySelector('p');
    t.is(para.innerHTML, 'Hello, world');
});

test.only('UserInput should blur, fire shortenLink and clear the input field on Enter w/ valid input', t => {
    // It seems that wrapper.ref() does not work with the new "ref" style (see https://github.com/airbnb/enzyme/issues/298
    // and https://github.com/airbnb/enzyme/issues/566. We will mount the component into the document and detect
    // changes in document.activeElement.

    document.body.innerHTML = '<div id="root"></div>';
    const shortenLink = spy();
    const wrapper = mount(<UserInput shortenLink={shortenLink}/>, { attachTo: document.body.firstChild });

    // Put the cursor into the input field. The first three lines are there for the sake of exercise, because the same
    // won't work with blur for some reason (commented out below). We'll be relying on document.activeElement.
    spy(document.querySelector('input[type="text"]'), 'focus');
    document.querySelector('input[type="text"]').focus();
    t.is(document.querySelector('input[type="text"]').focus.calledOnce, true);
    t.is(document.activeElement.nodeName, 'INPUT');

    // Type correct input and hit Enter
    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'http://' } });
    t.is(wrapper.state('input'), 'http://');
    wrapper.find('input[type="text"]').simulate('keyDown', {key: 'Enter', keyCode: 13});
    t.is(wrapper.state('input'), '');
    t.is(shortenLink.calledOnce, true); // shortenLink is tested separately in actions
    // spy(document.querySelector('input[type="text"]'), 'blur');
    // t.is(document.querySelector('input[type="text"]').blur.calledOnce, true);
    t.is(document.activeElement.nodeName, 'BODY');

    // TODO: ideally test that event.preventDefault() is called
});