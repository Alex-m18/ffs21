import React from 'react';
import PropTypes from 'prop-types';

export default function AcceptinButton(props) {
  const { title, onClick } = props;
  return (
    <button
      type="button"
      tabIndex={0}
      className="acceptin-button"
      onClick={onClick}
      onKeyPress={(evt) => { if (evt.key === 'Enter') onClick(); }}
    >
      {title}
    </button>
  );
}

AcceptinButton.defaultProps = {
  onClick: () => {},
  title: '',
};

AcceptinButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};
