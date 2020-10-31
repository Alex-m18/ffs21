/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './styles.css';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function ClientPage() {
  const navigate = useNavigate();

  return (
    <>
      <header className="page-header">
        <h1
          className="page-header__title"
          onClick={() => { navigate(''); }}
          onKeyPress={(evt) => { if (evt.key === 'Enter') navigate(''); }}
        >
          Идём
          <span>в</span>
          кино
        </h1>
      </header>

      <Outlet />
    </>
  );
}
