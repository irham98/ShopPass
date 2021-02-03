import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Browse from './screens/Browse';
import Demo from '../Demo';
import Cart from './screens/Cart';
import Home from 'screens/Home';
import Shoppass from './screens/Shoppass';
function App() {
  return (
    <Router>
      <Switch>
        {/* Remove the demo route if your app is ready! */}
        <Route path='/browse' component={Browse} />

        <Route path='/demo' component={Demo} />

        <Route path='/cart' component={Cart} />

        <Route path='/shoppass' component={Shoppass} />
        {/* Create your app routes here  */}
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default hot(App);
