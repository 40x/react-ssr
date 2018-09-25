import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import routes from './routes';

class App extends Component {
  render() {    
    return (
      <div>
        <ul>
          {
            routes.map(r => <li key={r.path}><Link to={r.path}>{r.title}</Link></li>)
          }
        </ul>

        <hr />

        <Switch>
          {
            routes.map(r => <Route exact={r.exact} key={r.path} path={r.path} component={r.component} />)
          }
        </Switch>
      </div>
    );
  }
}

export default App;
