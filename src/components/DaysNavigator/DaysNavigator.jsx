/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'moment/locale/ru';

moment.locale('ru');

export default function DaysNavigator(props) {
  const { date, onChange } = props;

  let diff = moment(date).subtract(moment().startOf('day')).dayOfYear() - 1;
  if (diff < 5) diff = 5;

  const nextDaysDiffs = [0];
  for (let i = 4; i >= 0; i -= 1) {
    nextDaysDiffs.push(diff - i);
  }

  const nextDays = nextDaysDiffs.map((o) => {
    const dayDate = moment().add(o, 'days');
    return {
      dayDate,
      day: dayDate.format('D'),
    };
  });

  const handleDayClick = (newDate) => onChange(moment(newDate).startOf('day'));
  const handleNextDayClick = () => onChange(moment(date).add(1, 'day').startOf('day'));

  return (
    <nav className="page-nav">
      {
        nextDays.map((o) => (
          <div
            role="button"
            key={o.day}
            tabIndex={0}
            className={DaysNavigator.getClassName(o.dayDate, date)}
            onClick={() => handleDayClick(o.dayDate)}
            onKeyPress={(evt) => { if (evt.key === 'Enter') handleDayClick(o.dayDate); }}
          >
            <span className="page-nav__day-week">{DaysNavigator.weekDayToString(o.dayDate)}</span>
            <span className="page-nav__day-number">{o.day}</span>
          </div>
        ))
      }
      {
        (diff < 13) && (
          <div
            className="page-nav__day page-nav__day_next"
            role="button"
            tabIndex={0}
            onClick={handleNextDayClick}
            onKeyPress={(evt) => { if (evt.key === 'Enter') handleNextDayClick(); }}
          />
        )
      }
    </nav>
  );
}

DaysNavigator.weekDayToString = (date = moment()) => {
  const res = date.format('ddd');
  return res[0].toUpperCase() + res.slice(1);
};

DaysNavigator.getClassName = (dayDate, date) => `
  page-nav__day 
  ${dayDate.startOf('day').isSame(moment().startOf('day')) ? 'page-nav__day_today' : ''} 
  ${dayDate.startOf('day').isSame(moment(date).startOf('day')) ? 'page-nav__day_chosen' : ''} 
  ${[6, 0].includes(moment(dayDate).day()) ? 'page-nav__day_weekend' : ''}
`;

DaysNavigator.defaultProps = {
  date: moment().startOf('day'),
  onChange: () => {},
};

DaysNavigator.propTypes = {
  date: PropTypes.objectOf(moment),
  onChange: PropTypes.func,
};
