import React from 'react';
import { connect } from 'react-redux';

import { clearHistory } from '../../redux/actions/linksData';

const ClearHistory = ({ clearHistory }) =>
    <div className="clear-history">
        <div className="text-previously-shortened previously-shortened">
            Previously shortened by you
        </div>
        <div className="clear-history-link">
            <a className="text-clear-history-link" onClick={clearHistory}>Clear history</a>
        </div>
    </div>;

export default connect(
    null,
    { clearHistory }
)(ClearHistory);