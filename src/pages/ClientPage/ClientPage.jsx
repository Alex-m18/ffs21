/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './styles.css';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import background from './i/background.jpg';

const cssBodyText = `
  background-image: url("${background}");
  background-size: cover;
  background-attachment: fixed;
  background-position: right;
`;
const pageHeaderStyle = {
  padding: '1.4rem',
};
const pageHeaderTitleStyle = {
  margin: 0,
  fontWeight: 900,
  fontSize: '3.4rem',
  color: '#FFFFFF',
  textTransform: 'uppercase',
};
const pageHeaderTitleSpanStyle = {
  fontWeight: 100,
};

export default function ClientPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.cssText = cssBodyText;
    return () => {
      document.body.style.cssText = '';
    };
  }, []);

  return (
    <div className="client-page">
      <header className="page-header" style={pageHeaderStyle}>
        <h1
          className="page-header__title"
          onClick={() => { navigate(''); }}
          onKeyPress={(evt) => { if (evt.key === 'Enter') navigate(''); }}
          style={pageHeaderTitleStyle}
        >
          Идём
          <span style={pageHeaderTitleSpanStyle}>в</span>
          кино
        </h1>
      </header>

      <Outlet />
    </div>
  );
}
