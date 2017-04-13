import React from 'react';

import '../styles/main';

import { Grid, Row, Col, Button, FormControl } from 'react-bootstrap/lib';

const App = () => {
    return <Grid>
        <Row>
            <Col xs={6} md={6}><div className="logo">Shooooort</div></Col>
            <Col xs={6} md={6}><div className="normal-text">The link shortener with a long name</div></Col>
        </Row>

        <Row>
            <Col xs={8} md={8}>
                <form className="user-input">
                    <FormControl
                        type="text"
                        // value={this.state.value}
                        placeholder="Paste the link you want to shorten here"
                        // onChange={this.handleChange}
                    />
                </form>
            </Col>
            <Col xs={4} md={4}><Button className="user-input">Shorten this link</Button></Col>
        </Row>
    </Grid>
};

export default App;