import React from 'react';

import '../styles/main';

import { Grid } from 'react-bootstrap/lib';

import Headline from './Headline';
import UserInput from './UserInput';
import ClearHistory from './ClearHistory';
import LinkList from './LinkList';

const App = () => {
    return <Grid>
        <Headline/>
        <UserInput/>
        <ClearHistory/>
        <LinkList/>
    </Grid>
};

export default App;