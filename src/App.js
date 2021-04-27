import React from 'react';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import RecordBook from './recordbook/RecordBook';
import RecordSearch from './recordsearch/RecordSearch';

const App = () =>{
  return(
    <Router>
      <Switch>
        <Route path="/recordsearch" component={RecordSearch} />
        <Route path="/" component={RecordBook} />
      </Switch>
    </Router>
  );
};

export default App;
