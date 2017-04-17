import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap/lib';

import { clearHistory } from '../redux/actions/linksData';

// TODO: check Navbar.Link component
const ClearHistory = ({ clearHistory }) =>
    <Row>
        <Col xs={2} md={2}></Col>
        <Col xs={4} md={4}>
            Previously shortened by you
        </Col>
        <Col xs={2} md={2}>
            <a onClick={clearHistory}>Clear history</a>
        </Col>
        <Col xs={2} md={2}></Col>
        <Col xs={2} md={2}></Col>
    </Row>;

export default connect(
    null,
    { clearHistory }
)(ClearHistory);