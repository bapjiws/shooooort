import React from 'react';
import { connect } from 'react-redux';

import { clearHistory } from '../../redux/actions/linksData';

const ClearHistory = ({ clearHistory }) =>
    <div className="clear-history-container">
        <div className="text-previously-shortened previously-shortened-container">
            Previously shortened by you
        </div>
        <div className="clear-history-link-container">
            <a className="text-clear-history-link" onClick={clearHistory}>Clear history</a>
        </div>
    </div>;

export default connect(
    null,
    { clearHistory }
)(ClearHistory);