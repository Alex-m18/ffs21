import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminPage from './pages/AdminPage/AdminPage';
import ClientPage from './pages/ClientPage/ClientPage';
import MoviesList from './components/MoviesList/MoviesList';
import ClientHall from './components/ClientHall/ClientHall';
import ClientPayment from './components/ClientPayment/ClientPayment';
import ClientTicket from './components/ClientTicket/ClientTicket';
import Page404 from './pages/Page404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/" element={<ClientPage />}>
          <Route path="hall/:seanceID" element={<ClientHall />} />
          <Route path="ticket/:ticketID" element={<ClientTicket />} />
          <Route path="payment" element={<ClientPayment />} />
          <Route element={<MoviesList />} />
        </Route>

        <Route element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
