import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import WTBBoardContainer from './components/WTBBoardContainer';
import WTBBoard from './components/WTBBoard';
import NewClothingItem from './components/NewClothingItem';
import EditClothingItem from './components/EditClothingItem';
import NewLook from './components/NewLook';
import EditLook from './components/EditLook';
import PackingList from './components/PackingList';

render((
  <Router history={browserHistory}>
    <Route component={WTBBoardContainer}>
      <Route path="/" component={WTBBoard}>
        <Route path="items/new" component={NewClothingItem} />
        <Route path="items/:id/edit" component={EditClothingItem} />
        <Route path="looks/new" component={NewLook} />
        <Route path="looks/:id/edit" component={EditLook} />
      </Route>
      <Route path="pack" component={PackingList} />
    </Route>
  </Router>
), document.getElementById('root'));
