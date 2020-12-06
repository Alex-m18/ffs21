/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './styles.css';
import React, { useEffect } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import MoviesList from '../../components/MoviesList/MoviesList';
import ClientHall from '../../components/ClientHall/ClientHall';
import ClientPayment from '../../components/ClientPayment/ClientPayment';
import ClientTicket from '../../components/ClientTicket/ClientTicket';

import background from './i/background.jpg';
import Page404 from '../Page404';

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

export default function ClientPage({ basename }) {
  const { path } = useRouteMatch();
  const history = useHistory();

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
          onClick={() => { history.push('/'); }}
          onKeyPress={(evt) => { if (evt.key === 'Enter') history.push('/'); }}
          style={pageHeaderTitleStyle}
        >
          Идём
          <span style={pageHeaderTitleSpanStyle}>в</span>
          кино
        </h1>
      </header>

      <Switch>
        <Route exact path={path}>
          <MoviesList basename={basename} />
        </Route>
        <Route path={`${path}hall/:seanceID`} component={ClientHall} />
        <Route path={`${path}ticket/:ticketID`} component={ClientTicket} />
        <Route path={`${path}payment`} component={ClientPayment} />
        <Route path="*" component={Page404} />
      </Switch>
    </div>
  );
}

ClientPage.propTypes = {
  basename: PropTypes.string,
};

ClientPage.defaultProps = {
  basename: '',
};
