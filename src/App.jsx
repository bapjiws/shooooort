import React from 'react';

import '../styles/main';

import { Grid } from 'react-bootstrap/lib';

import Headline from './Headline';
import UserInput from './UserInput';
import LinkList from './LinkList';

const App = () => {
    return <Grid>
        <Headline/>
        <UserInput/>
        <LinkList/>
    </Grid>
};

export default App;