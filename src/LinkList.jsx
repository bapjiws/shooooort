import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap/lib';

const LinkList = ({ links }) =>
    <div>
        <Row>
            <Col xs={2} md={2}></Col>
            <Col xs={5} md={5}>
                LINK
            </Col>
            <Col xs={1} md={1}>
                VISITS
            </Col>
            <Col xs={2} md={2}>
                LAST VISITED
            </Col>
            <Col xs={2} md={2}></Col>
        </Row>
        {
            links.map(link =>
                <Row key={link.shortcode}>
                    <Col xs={2} md={2}></Col>
                    <Col xs={5} md={5}>
                        <div><span>shooooort.com/</span><span>{ `${link.shortcode}` }</span></div>
                        <div>{ link.url }</div>
                    </Col>
                    <Col xs={1} md={1}>
                        100
                    </Col>
                    <Col xs={2} md={2}>
                        2 days ago
                    </Col>
                    <Col xs={2} md={2}></Col>
                </Row>
            )
        }
    </div>;

export default connect(
    state => ({
        links: state.shortcodes.list
    }),
    null
)(LinkList);