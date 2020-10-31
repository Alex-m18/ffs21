import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ClientPage from './pages/ClientPage/ClientPage';
import MoviesList from './components/MoviesList/MoviesList';
import ClientHall from './components/ClientHall/ClientHall';
import ClientPayment from './components/ClientPayment/ClientPayment';
import ClientTicket from './components/ClientTicket/ClientTicket';
import Page404 from './pages/Page404';

function App() {
  return (
    <BrowserRouter>
      <main className="container">
        <div className="row">
          <div className="col">
            <Routes>
              <Route path="/" element={<ClientPage />}>
                <Route path="hall/:seanceID" element={<ClientHall />} />
                <Route path="ticket/:ticketID" element={<ClientTicket />} />
                <Route path="payment" element={<ClientPayment />} />
                <Route element={<MoviesList />} />
              </Route>

              <Route element={<Page404 />} />
            </Routes>
          </div>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
