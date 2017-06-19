import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

// TODO: remove
import browserEnv from 'browser-env';
browserEnv();

// Import the unconnected version -- see http://redux.js.org/docs/recipes/WritingTests.html#connected-components
import { UserInput } from '../../src/components/UserInput';

let wrapper, inputHelp;
beforeEach(() => {
    wrapper = shallow(<UserInput />);
    inputHelp = <div className="text-validation-help input-help">Links should start with "http://" or "https://"</div>;
});

test('UserInput w/ invalid input should show feedback, cross icon and have "incorrect" style on focus', () => {
    // const { wrapper, inputHelp } = t.context.data;

    expect(wrapper.find('input[type="text"]').hasClass('text-input')).toBe(true);

    'http:/'.split('').reduce((acc, curr) => {
        acc += curr;
        wrapper.find('input[type="text"]').simulate('change', { target: { value: acc } });

        expect(wrapper.state('input')).toBe(acc);
        expect(
            wrapper.find('input[type="text"]').hasClass('text-input input-focus-incorrect')
        ).toBe(true);
        expect(wrapper.contains(inputHelp)).toBe(true);
        expect(wrapper.find('svg').hasClass('incorrect-input-icon')).toBe(true);
        return acc;
    }, '');
});

test('UserInput w/ valid input should not show feedback, contain check icon and have "correct" style on focus', () => {
    // const { wrapper, inputHelp } = t.context.data;

    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'http://' } });

    expect(
        wrapper.find('input[type="text"]').hasClass('text-input input-focus-correct')
    ).toBe(true); // or simply input-focus-correct
    expect(wrapper.contains(inputHelp)).toBe(false);
    expect(wrapper.find('svg').hasClass('correct-input-icon')).toBe(true);
});

// TODO: remove
test('can query for DOM elements', () => {
    document.body.innerHTML = '<p>Hello, world</p>';
    const para = document.querySelector('p');
    expect(para.innerHTML).toBe('Hello, world');
});

test('UserInput should blur, fire shortenLink and clear the input field on Enter w/ valid input', () => {
    // It seems that wrapper.ref() does not work with the new "ref" style (see https://github.com/airbnb/enzyme/issues/298
    // and https://github.com/airbnb/enzyme/issues/566. We will mount the component into the document and detect
    // changes in document.activeElement.
    document.body.innerHTML = '<div id="root"></div>';
    const shortenLink = spy();
    const wrapper = mount(<UserInput shortenLink={shortenLink}/>, { attachTo: document.body.firstChild });

    // Put the cursor into the input field. The first three lines are there for the sake of exercise, because the same
    // won't work with blur for some reason (commented out below). We'll be relying on document.activeElement.
    spy(wrapper.find('input[type="text"]').getDOMNode(), 'focus');
    wrapper.find('input[type="text"]').getDOMNode().focus();
    expect(wrapper.find('input[type="text"]').getDOMNode().focus.calledOnce).toBe(true);
    // OR:
    // spy(document.querySelector('input[type="text"]'), 'focus')
    // document.querySelector('input[type="text"]').focus();
    // t.is(document.querySelector('input[type="text"]').focus.calledOnce, true);
    expect(document.activeElement.nodeName).toBe('INPUT');

    // Type correct input and hit Enter
    spy(wrapper.find('input[type="text"]').getDOMNode(), 'blur');
    // OR:
    // spy(document.querySelector('input[type="text"]'), 'blur');

    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'http://' } });
    expect(wrapper.state('input')).toBe('http://');
    wrapper.find('input[type="text"]').simulate('keyDown', {key: 'Enter', keyCode: 13});
    expect(wrapper.state('input')).toBe('');
    expect(shortenLink.calledOnce).toBe(true); // shortenLink is tested separately in actions
    expect(wrapper.find('input[type="text"]').getDOMNode().blur.calledOnce).toBe(true);
    // OR:
    // t.is(document.querySelector('input[type="text"]').blur.calledOnce, true);
    expect(document.activeElement.nodeName).toBe('BODY');

    // Trying to test form submission (needed to test if event.preventDefault() has been called on Enter). Won't work:
    // spy(wrapper.find('form').getDOMNode(), 'submit');
    // wrapper.find('input[type="text"]').simulate('change', { target: { value: 'http://' } });
    // wrapper.find('input[type="text"]').simulate('keyDown', {key: 'Enter', keyCode: 13});
    // t.is(wrapper.find('form').getDOMNode().submit.calledOnce, true);
});