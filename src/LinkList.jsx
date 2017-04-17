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
                <Col className="text-table-heading" md={8}>
                    LINK
                </Col>
                <Col className="text-table-heading text-align-center" md={2}>
                    VISITS
                </Col>
                <Col className="text-table-heading text-align-center" md={2}>
                    LAST VISITED
                </Col>
            </Row>
            {
                Object.keys(linksData).map(key =>
                    <Row className="link-list-row flex-cross-axis-align-center" key={key}>
                        <Col md={8}>
                            <div><span className="text-url-body">shooooort.com/</span><span className="text-url-shortcode">{ `${key}` }</span></div>
                            <div className="text-url-original">{ linksData[key].url }</div>
                        </Col>
                        <Col className="text-data text-align-center" md={2}>
                            { linksData[key].redirectCount }
                        </Col>
                        <Col className="text-data text-align-center" md={2}>
                            { <TimeAgo date={linksData[key].lastSeenDate} /> }
                        </Col>
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