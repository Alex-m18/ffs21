/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import SwitchSelector from '../SwitchSelector/SwitchSelector';
import {
  adminSeatsChangeHall,
  adminSeatsChangeStates,
  adminSeatsRequest,
  adminSeatsUpdateRequest,
  adminSeatsUpdateSuccessClear,
} from '../../redux/adminSeats/actions';
import AcceptinButton from '../AcceptinButton/AcceptinButton';
import Preloader from '../Preloader/Preloader';
import ConfStepHeader from '../ConfStepHeader/ConfStepHeader';

const nextType = {
  standart: 'vip',
  vip: 'disabled',
  disabled: 'standart',
};

function AdminSeats(props) {
  const {
    halls,
    onUpdate,
    hall,
    hallID,
    onChangeHall,
    states,
    onChangeStates,
    getStates,
    updateStates,
    clearUpdateSucces,
    loading,
    loadingError,
    updating,
    updatingError,
    updatingSuccess,
  } = props;

  useEffect(() => {
    if (updatingSuccess) setTimeout(clearUpdateSucces, 1000);
    return () => {};
  }, [updatingSuccess, clearUpdateSucces]);

  useEffect(() => {
    if (!halls.data.length) {
      onChangeHall();
    } else if (!halls.data.map((o) => o.id).includes(hallID)) {
      onChangeHall(halls.data[0]);
    }
    return () => {};
  }, [halls, hallID, onChangeHall]);

  const calcStates = useCallback(
    () => {
      if (!hall) return [];
      const seats = [];
      for (let row = 1; row <= hall.rows; row += 1) {
        for (let column = 1; column <= hall.cols; column += 1) {
          const number = row * 100 + column;
          const seat = states.find((o) => o.number === number);
          if (seat) {
            seats.push(seat);
          } else {
            seats.push({
              number,
              row,
              column,
              type: 'standart',
              hallID: hall.id,
            });
          }
        }
      }
      return seats;
    },
    [hall, states],
  );

  useEffect(() => {
    if (hall) onChangeStates(calcStates());
    return () => {};
  // eslint-disable-next-line
  }, [hall, onChangeStates]);

  const refreshStates = useCallback(() => {
    if (hallID && hallID !== '') getStates(hallID);
  }, [hallID, getStates]);

  useEffect(() => {
    refreshStates();
    return () => {};
  }, [hallID, refreshStates, getStates]);

  const onHallCheckHandler = (id) => {
    onChangeHall(halls.data.find((o) => o.id === id));
  };

  const onChangeHandler = (evt) => {
    const { name, value } = evt.target;
    if (value === '') return;
    let numValue;
    try { numValue = Number.parseInt(value, 10); } catch { return; }
    onChangeHall({ ...hall, [name]: numValue });
  };

  const onUpdateHandler = () => {
    if (updating) return;
    if (hall) onUpdate(hall);
    if (states) updateStates(states);
  };

  const onSeatStateChange = (evt) => {
    let number;
    try {
      number = Number.parseInt(evt.target.getAttribute('number'), 10);
    } catch { return; }
    if (!number) return;
    onChangeStates(states.map((seat) => {
      if (seat.number === number) return { ...seat, type: nextType[seat.type] };
      return seat;
    }));
  };

  const rows = [];
  if (hall && states) {
    for (let row = 1; row <= hall.rows; row += 1) {
      rows.push(states.filter((o) => o.row === row));
    }
  }

  return (
    <section className="conf-step">
      <ConfStepHeader title="Конфигурация залов" />

      <div className="conf-step__wrapper">

        { halls && halls.data && hall && (
          <SwitchSelector groupName="chairs-hall" title="Выберите зал для конфигурации:" data={halls.data} checked={hallID} onChange={onHallCheckHandler} />
        )}

        { hall && (
          <>
            <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
            <div className="conf-step__legend">
              <label className="conf-step__label">
                Рядов, шт
                <input type="text" className="conf-step__input" placeholder="10" name="rows" value={hall.rows} onChange={onChangeHandler} />
              </label>
              <span className="multiplier">x</span>
              <label className="conf-step__label">
                Мест, шт
                <input type="text" className="conf-step__input" placeholder="8" name="cols" value={hall.cols} onChange={onChangeHandler} />
              </label>
            </div>
          </>
        )}

        <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
        <div className="conf-step__legend">
          <span className="conf-step__chair conf-step__chair_standart" />
          — обычные кресла
          <span className="conf-step__chair conf-step__chair_vip" />
          — VIP кресла
          <span className="conf-step__chair conf-step__chair_disabled" />
          — заблокированные (нет кресла)
          <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
        </div>

        <div className="conf-step__hall">
          <div className="conf-step__hall-wrapper">
            { loading && !loadingError && <Preloader /> }
            { !loading && loadingError && 'Ошибка' }
            { !loading && !loadingError && hall && states && rows.map((row) => (
              <div className="conf-step__row" key={nanoid()}>
                { row.map((seat) => (
                  <span
                    className={`conf-step__chair conf-step__chair_${seat.type}`}
                    number={seat.number}
                    key={nanoid()}
                    role="button"
                    onClick={onSeatStateChange}
                    onKeyPress={(evt) => { if (evt.key === 'Enter') onSeatStateChange(evt); }}
                    tabIndex={0}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <fieldset className="conf-step__buttons text-center">
          <AcceptinButton
            className="conf-step__button conf-step__button-regular"
            title="Отмена"
            onClick={refreshStates}
          />
          <AcceptinButton className="conf-step__button conf-step__button-accent" onClick={onUpdateHandler}>
            { updating && !updatingError && 'Сохраняем...' }
            { !updating && !updatingSuccess && !updatingError && 'Сохранить' }
            { updatingSuccess && !updatingError && 'Сохранено!' }
            { updatingError && 'Ошибка. Попробовать еще' }
          </AcceptinButton>
        </fieldset>
      </div>
    </section>
  );
}

AdminSeats.propTypes = {
  halls: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      rows: PropTypes.number.isRequired,
      cols: PropTypes.number.isRequired,
    })),
    loading: PropTypes.bool.isRequired,
    loadingError: PropTypes.shape({ message: PropTypes.string }),
  }),
  onUpdate: PropTypes.func,
  hall: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
  }),
  hallID: PropTypes.string.isRequired,
  states: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    column: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  onChangeHall: PropTypes.func.isRequired,
  onChangeStates: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired,
  updateStates: PropTypes.func.isRequired,
  clearUpdateSucces: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingError: PropTypes.shape({ message: PropTypes.string }),
  updating: PropTypes.bool.isRequired,
  updatingError: PropTypes.shape({ message: PropTypes.string }),
  updatingSuccess: PropTypes.bool.isRequired,
};

AdminSeats.defaultProps = {
  halls: null,
  hall: null,
  onUpdate: () => {},
  loadingError: null,
  updatingError: null,
};

const mapStateToProps = (state) => ({
  ...state.seats,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeHall: (hall) => dispatch(adminSeatsChangeHall(hall)),
  onChangeStates: (states) => dispatch(adminSeatsChangeStates(states)),
  getStates: (id) => dispatch(adminSeatsRequest(id)),
  updateStates: (states) => dispatch(adminSeatsUpdateRequest(states)),
  clearUpdateSucces: () => dispatch(adminSeatsUpdateSuccessClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminSeats);
