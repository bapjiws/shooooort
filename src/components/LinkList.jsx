import React, { Component } from 'react';
import { connect } from 'react-redux';

import TimeAgo from 'react-timeago';
import CopyToClipboard from 'react-copy-to-clipboard';

import { fetchLinksInfo } from '../../redux/actions/linksData';

class LinkList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseOver: false,
            clicked: false
        };
    }

    componentDidMount() {
        this.props.fetchLinksInfo();
        // this.timerID = setInterval(
        //     () => this.props.fetchLinksInfo(),
        //     1000
        // );
    }

    // componentWillUnmount() {
    //     clearInterval(this.timerID);
    // }

    render() {
        const { linksData } = this.props;
        const { mouseOver, clicked } = this.state;

        return (
            <section>
                <div className="link-list-header">
                    <div className="link-list-header-link text-table-heading">
                        LINK
                    </div>
                    <div className="link-list-header-visits text-table-heading text-align-center">
                        VISITS
                    </div>
                    <div className="link-list-header-last-visited text-table-heading text-align-center">
                        LAST VISITED
                    </div>
                </div>
                {
                    Object.keys(linksData).map(key =>
                        <div className="link-list-row" key={key}>
                            <div className="link-list-row-link">
                                <CopyToClipboard text={`http://goo.gl/${key}`}>
                                    <div>
                                        <span
                                            onMouseOver={() => this.setState({mouseOver: true})}
                                            onMouseLeave={() => {
                                                this.setState({mouseOver: false});
                                                this.setState({clicked: false})
                                            }}
                                            onClick={() => this.setState({clicked: true})}
                                            >
                                            <span className="text-url-body">http://goo.gl/</span>
                                            <span className="text-url-shortcode">{ `${key}` }</span>
                                        </span>
                                        <span
                                            className={mouseOver && !clicked ?
                                                'copy-suggestion-visible' : 'copy-suggestion-hidden'}>
                                            Click to copy this link
                                        </span>
                                    </div>
                                </ CopyToClipboard>
                                <a className="text-url-original" href={ linksData[key].url } target="_blank">{ linksData[key].url }</a>
                            </div>
                            <div className="link-list-row-visits text-data text-align-center">
                                { linksData[key].visits }
                            </div>
                            <div className="link-list-row-last-visited text-data text-align-center">
                                { <TimeAgo date={linksData[key].lastVisited} live={false} /> }
                            </div>
                        </div>
                    )
                }
            </section>
        )
    }
}

export default connect(
    state => ({
        linksData: state.linksData.data
    }),
    { fetchLinksInfo }
)(LinkList);