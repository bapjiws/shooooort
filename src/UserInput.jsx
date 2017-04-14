import React, { Component } from 'react';

import { Row, Col, Button, FormControl } from 'react-bootstrap/lib';

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
                <form>
                    <FormControl
                        className="user-input"
                        type="text"
                        value={this.state.input}
                        placeholder="Paste the link you want to shorten here"
                        onChange={this.handleChange}
                    />
                </form>
            </Col>
            <Col xs={2} md={2}><Button className="user-input">Shorten this link</Button></Col>
            <Col xs={2} md={2}></Col>
        </Row>
    }
}