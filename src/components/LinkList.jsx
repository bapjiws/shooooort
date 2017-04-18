import React, { Component } from 'react';
import { connect } from 'react-redux';

import TimeAgo from 'react-timeago';
import { Row, Col } from 'react-bootstrap/lib';
import CopyToClipboard from 'react-copy-to-clipboard';

import { fetchLinksInfo } from '../../redux/actions/linksData';

class LinkList extends Component {
    componentDidMount() {
        this.props.fetchLinksInfo();
        this.timerID = setInterval(
            () => this.props.fetchLinksInfo(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        // TODO: ideally, should only re-render if the incoming data is different -- reselect could be an option.

        const { linksData } = this.props;
        return <div>
            <Row className="link-list-header">
                <Col className="text-table-heading" md={8}>
                    LINK
                </Col>
                <Col className="text-table-heading text-align-center" md={1}>
                    VISITS
                </Col>
                <Col className="text-table-heading text-align-center" md={3}>
                    LAST VISITED
                </Col>
            </Row>
            {
                Object.keys(linksData).map(key =>
                    <Row className="link-list-row flex-cross-axis-align-center" key={key}>
                        <Col md={8}>
                            <CopyToClipboard text={`shooooort.com/${key}`}>
                                <div><span className="text-url-body">shooooort.com/</span><span className="text-url-shortcode">{ `${key}` }</span></div>
                            </ CopyToClipboard>

                            <div className="text-url-original">{ linksData[key].url }</div>
                        </Col>
                        <Col className="text-data text-align-center" md={1}>
                            { linksData[key].redirectCount }
                        </Col>
                        <Col className="text-data text-align-center" md={3}>
                            { <TimeAgo date={linksData[key].lastSeenDate} live={false} /> }
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