/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './styles.css';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import background from './i/background.jpg';
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import LoginForm from '../../components/LoginForm/LoginForm';
import { userLoginRequest } from '../../redux/user/actions';

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

function AdminPage(props) {
  const {
    user,
    loading,
    error,
    onLogin,
  } = props;

  const history = useHistory();

  useEffect(() => {
    document.body.style.cssText = bodyStyle;
    return () => { document.body.style.cssText = ''; };
  }, []);

  const onLoginHandler = (data) => {
    onLogin(data);
  };

  return (
    <div className="admin-page">
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
        <span className="page-header__subtitle" style={pageHeaderSubtitleStyle}>
          Администраторррская
        </span>
      </header>

      <main className="conf-steps">

        { !user && <LoginForm onSubmit={onLoginHandler} loading={loading} error={error} /> }

        { user && <AdminPanel /> }

      </main>

    </div>
  );
}

AdminPage.propTypes = {
  user: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
  onLogin: PropTypes.func.isRequired,
};

AdminPage.defaultProps = {
  user: null,
  error: null,
};

const mapStateToProps = (state) => ({
  user: state.user.data,
  loading: state.user.loading,
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data) => dispatch(userLoginRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
