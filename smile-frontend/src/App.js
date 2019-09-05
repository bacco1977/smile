import React from 'react';
import SmileLanding from './components/SmileLanding';
import {Route, HashRouter} from 'react-router-dom';

function App() {
    return (
      <HashRouter basename="/">
        <Route exact path="/" render={() => <SmileLanding />}/>
      </HashRouter>
    );
}

export default App;
