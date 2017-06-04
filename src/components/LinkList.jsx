import React, { Component } from 'react';
import { connect } from 'react-redux';

import LinkListRow from './LinkListRow';

import { fetchLinksInfo } from '../../redux/actions/linksData';

class LinkList extends Component {
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
                        <LinkListRow key={key} rowId={key} linksData={linksData}/>
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