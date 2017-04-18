import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap/lib';

import { clearHistory } from '../../redux/actions/linksData';

const ClearHistory = ({ clearHistory }) =>
    <Row className="clear-history flex-cross-axis-align-baseline">
        <Col className="text-section-heading" md={6}>
            Previously shortened by you
        </Col>
        <Col md={2}>
            <a className="text-clear-history-link" onClick={clearHistory}>Clear history</a>
        </Col>
    </Row>;

export default connect(
    null,
    { clearHistory }
)(ClearHistory);