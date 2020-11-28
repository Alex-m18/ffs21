import React from 'react';
import PropTypes from 'prop-types';
import closeImg from './i/close.png';
import AcceptinButton from '../AcceptinButton/AcceptinButton';
import './styles.css';

const AddForm = (props) => {
  const {
    title,
    submitTitle,
    onClose,
    onChange,
    onSubmit,
    fields,
  } = props;

  const onChangeHandler = (evt) => {
    const { name, value } = evt.target;
    onChange(name, value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  };

  return (
    <div className="popup active">
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              {title}
              <span
                className="popup__dismiss"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyPress={(evt) => { if (evt.key === 'Enter') onClose(); }}
              >
                <img src={closeImg} alt="Закрыть" />
              </span>
            </h2>
          </div>
          <div className="popup__wrapper">
            <form onSubmit={handleSubmit} acceptCharset="utf-8">

              { fields.map((field) => (
                <React.Fragment key={field.title}>
                  { (field.type === 'message') && (
                    <p className="conf-step__paragraph">{field.title}</p>
                  )}

                  { (field.type === 'text') && (
                    <label className="conf-step__label conf-step__label-fullsize" htmlFor={field.name} key={field.name}>
                      {field.title}
                      <input
                        className="conf-step__input"
                        type="text"
                        placeholder={field.placeholder || ''}
                        name={field.name}
                        onChange={onChangeHandler}
                        value={field.value}
                        required={field.required}
                      />
                    </label>
                  )}

                  { (field.type === 'option') && (
                    <label className="conf-step__label conf-step__label-fullsize" htmlFor={field.name} key={field.name}>
                      <select className="conf-step__input" name={field.name} required={field.required} onChange={onChangeHandler}>
                        { field.options.map((option) => (
                          <option value={option.value} key={option.value}>{option.title}</option>
                        )) }
                      </select>
                    </label>
                  )}
                </React.Fragment>
              )) }
              <div className="conf-step__buttons text-center">
                <input
                  type="submit"
                  value={submitTitle}
                  className="conf-step__button conf-step__button-accent"
                />
                <AcceptinButton className="conf-step__button conf-step__button-regular" onClick={onClose}>Отменить</AcceptinButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddForm.propTypes = {
  title: PropTypes.string.isRequired,
  submitTitle: PropTypes.string,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  fields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.required,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })),
    name: PropTypes.string,
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
  })),
};

AddForm.defaultProps = {
  onClose: () => {},
  onChange: () => {},
  onSubmit: () => {},
  submitTitle: 'OK',
  fields: [],
};

export default AddForm;
