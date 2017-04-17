import React from 'react';

import { Row, Col } from 'react-bootstrap/lib';

const Headline = () => <Row className="headline">
    <Col xs={2} md={2}></Col>
    <Col className="text-logo" xs={4} md={4}>Shooooort</Col>
    <Col className="text-normal text-align-end" xs={4} md={4}>The link shortener with a long name</Col>
    <Col xs={2} md={2}></Col>
</Row>;

export default Headline;
