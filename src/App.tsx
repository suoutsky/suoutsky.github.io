import React from 'react';
import Home from './pages/home/index';
import Detail from './pages/detail/index';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route  exact path="/">
            <Home/>
          </Route>
          <Route  exact path="/home">
            <Home/>
          </Route>
          <Route path="/detail">
            <Detail/>
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
