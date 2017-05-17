import React from 'react';

import '../../styles/main';

import Headline from './Headline';
import UserInput from './UserInput';
import ClearHistory from './ClearHistory';
import LinkList from './LinkList';

const App = () => {
    return <div className="components">
        <Headline/>
        <UserInput/>
        <ClearHistory/>
        <LinkList/>
    </div>
};

export default App;