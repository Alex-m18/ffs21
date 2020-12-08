import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import AdminPage from './pages/AdminPage/AdminPage';
import ClientPage from './pages/ClientPage/ClientPage';
import Page404 from './pages/Page404';

const basename = process.env.PUBLIC_URL;

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Switch>
        <Route exact path="/admin" component={AdminPage} />
        <Route path="/" component={ClientPage} />
        <Route path="*" component={Page404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
