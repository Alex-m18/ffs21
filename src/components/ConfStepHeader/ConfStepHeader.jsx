import React from 'react';
import PropTypes from 'prop-types';

function ConfStepHeader({ title }) {
  const onClick = (evt) => {
    evt.currentTarget.classList.toggle('conf-step__header_closed');
    evt.currentTarget.classList.toggle('conf-step__header_opened');
  };

  return (
    <header
      className="conf-step__header conf-step__header_closed"
      role="button"
      onClick={onClick}
      onKeyPress={(evt) => { if (evt.key === 'Enter') onClick(evt); }}
      tabIndex={0}
    >
      <h2 className="conf-step__title">{title}</h2>
    </header>
  );
}

ConfStepHeader.propTypes = {
  title: PropTypes.string,
};

ConfStepHeader.defaultProps = {
  title: '',
};

export default ConfStepHeader;
