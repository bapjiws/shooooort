import React from 'react';

import { Row, Col } from 'react-bootstrap/lib';

const Headline = () => <Row className="headline flex-cross-axis-align-baseline">
    <Col className="text-logo" md={6}>URL Shortener</Col>
    <Col className="text-normal padding-left-description" md={6}>Does exactly what it's supposed to.</Col>
</Row>;

export default Headline;
