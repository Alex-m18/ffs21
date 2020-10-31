import React from 'react';
import PropTypes from 'prop-types';

export default function ClientHeader({ title }) {
  return (
    <header className="tichet__check">
      <h2 className="ticket__check-title">{title}</h2>
    </header>
  );
}

ClientHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
