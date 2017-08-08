import React, { Component } from 'react';
import { connect } from 'react-redux';

import LinkListRow from './LinkListRow';

import { fetchLinksInfo, updateLinks } from '../../redux/actions/linksData'; // The second one is the RxJS version

class LinkList extends Component {
    componentDidMount() {
        // this.props.fetchLinksInfo();
        this.props.updateLinks();

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
                <div className="link-list-header-container">
                    <div className="link-list-header-link-container text-table-heading">
                        LINK
                    </div>
                    <div className="link-list-header-visits-container text-table-heading">
                        VISITS
                    </div>
                    <div className="link-list-header-last-visited-container text-table-heading">
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
    { fetchLinksInfo, updateLinks } // The second one is the RxJS version
)(LinkList);