import React from 'react';

import { Row, Col } from 'react-bootstrap/lib';

const Headline = () => <Row className="headline">
    <Col xs={2} md={2}></Col>
    <Col xs={4} md={4}><div className="text-logo">Shooooort</div></Col>
    <Col xs={4} md={4}><div className="text-normal text-align-end">The link shortener with a long name</div></Col>
    <Col xs={2} md={2}></Col>
</Row>;

export default Headline;
