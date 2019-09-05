import React from 'react';
import SmileLanding from './components/SmileLanding';
import {Route, HashRouter} from 'react-router-dom';
import ImageUpload from './components/ImageUpload';
import Navigation from './components/Navigation';

function App() {
    return (
      <div className="container">
        <Navigation/>
        <HashRouter basename="/">
          <Route exact path="/" render={() => <SmileLanding />}/>
          <Route exact path="/upload" render={() => <ImageUpload />}/>
        </HashRouter>
      </div>
    );
}

export default App;
