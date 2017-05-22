import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, FormGroup, FormControl, HelpBlock } from 'react-bootstrap/lib';

import { shortenLink } from '../../redux/actions/linksData';

import { inputIsValid } from '../../utils/inputValidation';

class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            inputIsValid: false
        };
        this.form = null;
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
                this.form.blur();
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

        return <div className="user-input">
            <form className="form">
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
                        inputRef={ref => this.form = ref}
                    />
                    <FormControl.Feedback />
                    { input && !inputIsValid && <HelpBlock className="text-form-control-validation-help">Links should start with "http://" or "https://"</HelpBlock> }
                </FormGroup>
            </form>
            <div className="button">
                <Button
                    disabled={!input || !inputIsValid}
                    onClick={this.handleCLick}
                >
                    Shorten this link
                </Button>
            </div>
        </div>
    }
}

export default connect(
    null, // mapStateToProps
    { shortenLink }
)(UserInput);