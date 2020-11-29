import React from 'react';
import PropTypes from 'prop-types';

function LoginForm(props) {
  const {
    loading,
    error,
    onSubmit,
  } = props;

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    onSubmit({
      email: evt.target.mail.value,
      password: evt.target.pwd.value,
    });
  };

  let submitBtnText = 'Авторизоваться';
  if (loading) submitBtnText = 'Авторизация';
  if (error) submitBtnText = 'Ошибка. Попробовать еше';

  return (
    <section className="login">
      <header className="login__header">
        <h2 className="login__title">Авторизация</h2>
      </header>
      <div className="login__wrapper">
        <form className="login__form" onSubmit={onSubmitHandler} acceptCharset="utf-8">
          <label className="login__label" htmlFor="mail">
            E-mail
            <input className="login__input" type="mail" placeholder="example@domain.xyz" name="mail" required />
          </label>
          <label className="login__label" htmlFor="pwd">
            Пароль
            <input className="login__input" type="password" placeholder="" name="pwd" required />
          </label>
          <div className="text-center">
            <input value={submitBtnText} type="submit" className="login__button" />
          </div>
        </form>
      </div>
    </section>
  );
}

LoginForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.shape({ message: PropTypes.string }),
  onSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  loading: false,
  error: null,
};

export default LoginForm;
