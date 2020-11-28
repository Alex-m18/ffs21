import React from 'react';
import PropTypes from 'prop-types';

export default function AcceptinButton(props) {
  const {
    title,
    onClick,
    className,
    children,
  } = props;

  return (
    <button
      className={className}
      type="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={(evt) => { if (evt.key === 'Enter') onClick(); }}
    >
      { title }
      { children }
    </button>
  );
}

AcceptinButton.defaultProps = {
  onClick: () => {},
  title: null,
  className: 'acceptin-button',
  children: null,
};

AcceptinButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
