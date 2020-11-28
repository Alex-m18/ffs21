/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

function SwitchSelector(props) {
  const {
    groupName,
    title,
    data,
    checked,
    onChange,
  } = props;

  const handleChange = (evt) => {
    onChange(evt.target.value);
  };

  return (
    <>
      { title && <p className="conf-step__paragraph">{title}</p> }
      <ul className="conf-step__selectors-box">
        { data && data.map((item) => (
          <li key={nanoid()}>
            <input
              type="radio"
              className="conf-step__radio"
              name={groupName}
              onChange={handleChange}
              value={item.id}
              checked={item.id === checked}
            />
            <span className="conf-step__selector">{item.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

SwitchSelector.propTypes = {
  groupName: PropTypes.string.isRequired,
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
  checked: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

SwitchSelector.defaultProps = {
  title: null,
  data: [],
  onChange: () => {},
};

export default SwitchSelector;
