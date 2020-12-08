import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
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

  const onFileChangeHandler = (evt, options) => {
    const { maxSize } = options;
    const onFileChange = options.onChange;
    if (!onFileChange) return;
    if (!evt.target.files[0]) return;

    if (maxSize && evt.target.files[0].size > maxSize) {
      // eslint-disable-next-line no-param-reassign
      evt.target.value = '';
      return;
    }
    onFileChange(evt.target.files);
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
                  { (field.type === 'message') && field.title.split(String.fromCharCode(10)).map((p) => (
                    <p className="conf-step__paragraph" key={nanoid()}>{p}</p>
                  ))}

                  { (['text', 'number', 'date'].includes(field.type)) && (
                    <label className="conf-step__label conf-step__label-fullsize" htmlFor={field.name} key={field.name}>
                      {field.title}
                      <input
                        className="conf-step__input"
                        type={field.type}
                        placeholder={field.placeholder || ''}
                        name={field.name}
                        onChange={onChangeHandler}
                        value={field.value}
                        required={field.required}
                        max={field.max}
                        min={field.min}
                        step={field.step}
                      />
                    </label>
                  )}

                  { (field.type === 'file') && (
                    <label className="conf-step__label conf-step__label-fullsize" htmlFor={field.name} key={field.name}>
                      {field.title}
                      <input
                        className="conf-step__input"
                        type={field.type}
                        name={field.name}
                        onChange={(evt) => onFileChangeHandler(evt, field)}
                        value={field.value}
                        files={field.files}
                        required={field.required}
                        accept={field.accept}
                        multiple={field.multiple}
                      />
                    </label>
                  )}

                  { (field.type === 'option') && (
                    <label className="conf-step__label conf-step__label-fullsize" htmlFor={field.name} key={field.name}>
                      {field.title}
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
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    })),
    name: PropTypes.string,
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    files: PropTypes.instanceOf(FileList),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
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
