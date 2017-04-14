import React from 'react';

import '../styles/main';

import { Grid } from 'react-bootstrap/lib';

import Headline from './Headline';
import UserInput from './UserInput';

const App = () => {
    return <Grid>
        <Headline/>
        <UserInput/>
    </Grid>
};

export default App;