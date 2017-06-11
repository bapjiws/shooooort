import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { shortenLink } from '../../redux/actions/linksData';

import { inputIsValid } from '../../utils/inputValidation';

// Use named export for unconnected component (for tests)
export class UserInput extends Component {
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

    render() {
        const { input, inputIsValid } = this.state;

        // TODO: implement classnames and move to utils
        let classes = classnames('text-input', {
            'input-focus-incorrect': input && !inputIsValid,
            'input-focus-correct': input && inputIsValid
        });

        return <div className="user-input-container">
             <form className="form-container">
                 <input
                     type="text"
                     className={classes}
                     placeholder="Paste the link you want to shorten here"
                     value={this.state.input}
                     onChange={this.handleChange}
                     onKeyDown={this.handleKeyDown}
                     ref={ input => { this.textInput = input }}
                 />
                 {
                     input && (!inputIsValid ?
                         <div className="input-feedback-icon-container">
                             <svg className="incorrect-input-icon">
                                 <use xlinkHref="../../assets/icons.svg#icon-cross"/>
                             </svg>
                         </div> :
                         <div className="input-feedback-icon-container">
                             <svg className="correct-input-icon">
                                 <use xlinkHref="../../assets/icons.svg#icon-checkmark"/>
                             </svg>
                         </div>)
                 }
                { input && !inputIsValid && <div className="text-validation-help input-help">Links should start with "http://" or "https://"</div> }
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