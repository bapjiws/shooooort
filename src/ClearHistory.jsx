import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap/lib';

const ClearHistory = ({ clearHistory }) =>
    <Row>
        <Col xs={2} md={2}></Col>
        <Col xs={4} md={4}>
            Previously shortened by you
        </Col>
        <Col xs={2} md={2}>
            <a onClick={() => alert('History will be erased!')}>Clear history</a>
        </Col>
        <Col xs={2} md={2}></Col>
        <Col xs={2} md={2}></Col>
    </Row>;

export default connect(
    null,
    {} // TODO: inject clearHistory action
)(ClearHistory);