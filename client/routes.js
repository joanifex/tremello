import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NoMatch from './components/NoMatch';
import Board from './components/Board'

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Board} />
    </Route>
    <Route path="*" status={404} component={NoMatch}/>
  </Route>
)
