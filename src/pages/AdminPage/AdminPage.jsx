/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './styles.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import background from './i/background.jpg';
import AdminPanel from '../../components/AdminPanel/AdminPanel';

const bodyStyle = `
  background-image: url("${background}");
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: multiply;
  background-size: cover;
  background-attachment: fixed;
  counter-reset: num;
`;
const pageHeaderStyle = {
  color: '#FFFFFF',
  textTransform: 'uppercase',
};
const pageHeaderTitleStyle = {
  margin: 0,
  fontWeight: 900,
  fontSize: '3.4rem',
};
const pageHeaderTitleSpanStyle = {
  fontWeight: 100,
};
const pageHeaderSubtitleStyle = {
  fontSize: '1rem',
  letterSpacing: '0.46em',
};

export default function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.cssText = bodyStyle;
    return () => { document.body.style.cssText = ''; };
  }, []);

  return (
    <div className="admin-page">
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
        <span className="page-header__subtitle" style={pageHeaderSubtitleStyle}>
          Администраторррская
        </span>
      </header>

      <main className="conf-steps">

        <AdminPanel />

      </main>

    </div>
  );
}
