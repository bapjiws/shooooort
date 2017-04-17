import React, { Component } from 'react';
import { connect } from 'react-redux';

import TimeAgo from 'react-timeago';
import { Row, Col } from 'react-bootstrap/lib';

import { fetchLinksInfo } from '../redux/actions/linksData';

class LinkList extends Component {
    componentDidMount() {
        this.props.fetchLinksInfo();
    }

    render() {
        const { linksData } = this.props;
        return <div>
            <Row className="link-list-header">
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
                Object.keys(linksData).map(key =>
                    <Row className="link-list-row" key={key}>
                        <Col xs={2} md={2}></Col>
                        <Col xs={5} md={5}>
                            <div><span>shooooort.com/</span><span>{ `${key}` }</span></div>
                            <div>{ linksData[key].url }</div>
                        </Col>
                        <Col xs={1} md={1}>
                            { linksData[key].redirectCount }
                        </Col>
                        <Col xs={2} md={2}>
                            { <TimeAgo date={linksData[key].lastSeenDate} /> }
                        </Col>
                        <Col xs={2} md={2}></Col>
                    </Row>
                )
            }
        </div>;
    }
}

export default connect(
    state => ({
        linksData: state.linksData.data
    }),
    { fetchLinksInfo }
)(LinkList);