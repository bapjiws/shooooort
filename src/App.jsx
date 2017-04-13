import React from 'react';

import '../styles/main';

import { Grid, Row, Col } from 'react-bootstrap/lib';

const App = () => {
    return <Grid>
        <Row>
            <Col xs={6} md={6}><div className="logo">Shooooort</div></Col>
            <Col xs={6} md={6}><div className="logo">Shooooort</div></Col>
        </Row>
    </Grid>
};

export default App;