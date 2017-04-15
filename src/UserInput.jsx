import React, { Component } from 'react';

import { Row, Col, Button, FormControl } from 'react-bootstrap/lib';

import { shortenLink, getShortcodeStats } from './actions/shortcode';

export default class Headline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
    }

    handleChange = event => {
        console.log('event:', event.target.value);
        this.setState({input: event.target.value});
    };

    render() {
        return <Row>
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
                    />
                </form>
            </Col>
            <Col xs={2} md={2}>
                <Button
                    className={this.state.input ? "button-with-input" : "button-no-input"}
                    disabled={this.state.input === ''}
                    //onClick={() => getShortcodeStats(this.state.input)}
                    onClick={() => shortenLink(this.state.input)}
                >
                    Shorten this link
                </Button></Col>
            <Col xs={2} md={2}></Col>
        </Row>
    }
}