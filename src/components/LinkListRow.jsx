import React, { Component } from 'react';

import TimeAgo from 'react-timeago';
import CopyToClipboard from 'react-copy-to-clipboard';

class LinkListRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseOver: false,
            clicked: false
        };
    }

    render() {
        const { rowId, linksData } = this.props;
        const { mouseOver, clicked } = this.state;

        return (
            <div className="link-list-row-container" key={rowId}>
                <div className="link-list-row-link-container">
                    <CopyToClipboard text={`http://goo.gl/${rowId}`}>
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
                                <span className="text-url-shortcode">{ `${rowId}` }</span>
                            </span>
                            <span
                                className={mouseOver && !clicked ?
                                    'copy-suggestion-visible' : 'copy-suggestion-hidden'}>
                                            Click to copy this link
                                        </span>
                        </div>
                    </ CopyToClipboard>
                    <a className="text-url-original" href={ linksData[rowId].url } target="_blank">{ linksData[rowId].url }</a>
                </div>
                <div className="link-list-row-visits-container text-data">
                    { linksData[rowId].visits }
                </div>
                <div className="link-list-row-last-visited-container text-data">
                    { <TimeAgo date={linksData[rowId].lastVisited} live={false} /> }
                </div>
            </div>
        )
    }
}

export default LinkListRow;