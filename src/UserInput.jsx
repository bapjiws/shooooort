import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Button, FormControl } from 'react-bootstrap/lib';

import { shortenLink } from '../redux/actions/linksData';

class Headline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
        this.form = null;
    }

    handleChange = event => {
        this.setState({input: event.target.value});
    };

    handleCLick = () => {
        this.props.shortenLink(this.state.input);
        this.setState({input: ''});
    };

    handleKeyDown = event => {
        switch (event.key) {
            case 'Enter':
                event.preventDefault();
                this.props.shortenLink(this.state.input);
                this.setState({input: ''});
                this.form.blur();
                break;
        }
    };

    render() {
        return <Row className="user-input flex-cross-axis-align-center">
            <Col xs={2} md={2}></Col>
            <Col xs={6} md={6}>
                {/*TODO: add simple validation: links should start with http:// or https://*/}
                <form>
                    <FormControl
                        className={this.state.input ? "form-with-input" : "form-no-input"}
                        type="text"
                        value={this.state.input}
                        placeholder="Paste the link you want to shorten here"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        inputRef={ref => this.form = ref}
                    />
                </form>
            </Col>
            <Col xs={2} md={2}>
                <Button
                    className={this.state.input ? "button-with-input" : "button-no-input"}
                    disabled={this.state.input === ''}
                    onClick={this.handleCLick}
                >
                    Shorten this link
                </Button></Col>
            <Col xs={2} md={2}></Col>
        </Row>
    }
}

export default connect(
    null, // mapStateToProps
    { shortenLink }
)(Headline);