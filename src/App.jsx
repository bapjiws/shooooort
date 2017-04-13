import React from 'react';

import '../styles/main';

import { Grid, Row, Col, Button, FormControl } from 'react-bootstrap/lib';

const App = () => {
    return <Grid>
        <Row>
            <Col xs={2} md={2}></Col>
            <Col xs={4} md={4}><div className="logo">Shooooort</div></Col>
            <Col xs={4} md={4}><div className="normal-text">The link shortener with a long name</div></Col>
            <Col xs={2} md={2}></Col>
        </Row>

        <Row>
            <Col xs={2} md={2}></Col>
            <Col xs={6} md={6}>
                <form>
                    <FormControl
                        className="user-input"
                        type="text"
                        // value={this.state.value}
                        placeholder="Paste the link you want to shorten here"
                        // onChange={this.handleChange}
                    />
                </form>
            </Col>
            <Col xs={2} md={2}><Button className="user-input">Shorten this link</Button></Col>
            <Col xs={2} md={2}></Col>
        </Row>
    </Grid>
};

export default App;