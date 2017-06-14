import test from 'ava';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import ReactDOM from 'react-dom';

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
    // See https://github.com/reactjs/redux/issues/1534#issuecomment-205061049 on passing down the store
    // Also, see https://github.com/reactjs/react-redux/issues/325#issuecomment-262223079 on mapStateToProps

    document.body.innerHTML = '<div id="root"></div>';
    // ReactDOM.render(<UserInput />, document.getElementById('root'));
    // let input = document.querySelector('input[type="text"]');
    // console.log('input:', input.blur);
    //
    // input.addEventListener('onBlur', event => console.log('event:', event));
    // input.blur();


    // const { wrapper } = t.context.data;
    const shortenLink = spy();
    // document.body.innerHTML = '<div id="root"></div>';
    const wrapper = mount(<UserInput shortenLink={shortenLink}/>, { attachTo: document.body.firstChild });

    wrapper.find('input[type="text"]').simulate('focus');
    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'h' } });

    t.is(wrapper.state('input'), 'h');
    t.is(wrapper.find('input[type="text"]').hasClass('input-focus-incorrect'), true);


    // spy(wrapper.find('input[type="text"]'), 'blur');
    spy(document.querySelector('input[type="text"]'), 'focus');
    document.querySelector('input[type="text"]').focus();
    // wrapper.find('input[type="text"]').simulate('focus');
    t.is(document.querySelector('input[type="text"]').focus.calledOnce, true);
    t.is(document.activeElement.nodeName, 'INPUT');
    // console.log('TEST:', document.activeElement.nodeName);

    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'http://' } });
    t.is(wrapper.state('input'), 'http://');
    wrapper.find('input[type="text"]').simulate('keyDown', {key: 'Enter', keyCode: 13});
    t.is(shortenLink.calledOnce, true);
    t.is(wrapper.state('input'), '');
    // t.is(document.querySelector('input[type="text"]').focus.calledOnce, true);
    t.is(document.activeElement.nodeName, 'BODY');
    // console.log('TEST:', document.activeElement.nodeName);


    // TODO: ideally test that event.preventDefault() is called
    // TODO: Remove setup-browser-env.js and clean package.json when done
});