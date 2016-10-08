import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import WTBBoardContainer from './components/WTBBoardContainer';
import WTBBoard from './components/WTBBoard';
import NewClothingItem from './components/NewClothingItem';
import EditClothingItem from './components/EditClothingItem';

render((
  <Router history={browserHistory}>
    <Route component={WTBBoardContainer}>
      <Route path="/" component={WTBBoard}>
        <Route path="new" component={NewClothingItem} />
        <Route path="edit/:item_id" component={EditClothingItem} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'));
