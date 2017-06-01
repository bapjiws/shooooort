import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap/lib';

import { shortenLink } from '../../redux/actions/linksData';

import { inputIsValid } from '../../utils/inputValidation';

class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            inputIsValid: false
        };
        this.textInput = null;
    }

    handleChange = event => {
        const input = event.target.value;
        this.setState({
            input,
            inputIsValid: inputIsValid(input)
        });
    };

    handleCLick = () => {
        this.props.shortenLink(this.state.input);
        this.setState({input: ''});
    };

    handleKeyDown = event => {
        switch (event.key) {
            case 'Enter':
                if (!(this.state.input && this.state.inputIsValid)) {
                    event.preventDefault();
                    return;
                }

                event.preventDefault();
                this.props.shortenLink(this.state.input);
                this.setState({input: ''});
                this.textInput.blur();
                break;
        }
    };

    getValidationState = () => {
        const input = this.state.input;
        if (!input) return;
        return inputIsValid(input) ? 'success' : 'error';
    };

    render() {
        const { input, inputIsValid } = this.state;

        return <div className="user-input-container">
            <form className="form-container">
                <FormGroup
                    validationState={this.getValidationState()}
                >
                    <FormControl
                        className="text-form-control"
                        type="text"
                        value={this.state.input}
                        placeholder="Paste the link you want to shorten here"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        inputRef={ref => this.textInput = ref}
                    />
                    <FormControl.Feedback />
                    { input && !inputIsValid && <HelpBlock className="text-validation-help">Links should start with "http://" or "https://"</HelpBlock> }
                </FormGroup>
            </form>
            <div className="button-container">
                <button
                    disabled={!input || !inputIsValid}
                    onClick={this.handleCLick}
                >
                    Shorten this link
                </button>
            </div>

            <form className="form-container">
                <input
                    type="text"
                    className="text-form-control"
                    placeholder="Paste the link you want to shorten here"
                    value={this.state.input}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    ref={(input) => { this.textInput = input; }}
                />
                { input && !inputIsValid && <div className="text-validation-help help-block">Links should start with "http://" or "https://"</div> }
            </form>
            <div className="button-container">
                <button
                    disabled={!input || !inputIsValid}
                    onClick={this.handleCLick}
                >
                    Shorten this link
                </button>
            </div>
        </div>
    }
}

export default connect(
    null, // mapStateToProps
    { shortenLink }
)(UserInput);