/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SwitchSelector from '../SwitchSelector/SwitchSelector';
import { adminPricesChangeHall } from '../../redux/adminPrices/actions';
import AcceptinButton from '../AcceptinButton/AcceptinButton';
import ConfStepHeader from '../ConfStepHeader/ConfStepHeader';

function AdminPrices(props) {
  const {
    halls,
    onUpdate,
    hall,
    hallID,
    onChangeHall,
  } = props;

  useEffect(() => {
    if (!halls.data.length) {
      onChangeHall();
    } else if (!halls.data.map((o) => o.id).includes(hallID)) {
      onChangeHall(halls.data[0]);
    } else {
      onChangeHall(halls.data.find((o) => o.id === hallID));
    }
    return () => {};
  }, [halls, hallID, onChangeHall]);

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
    if (halls && halls.updating) return;
    if (hall) onUpdate(hall);
  };

  return (
    <section className="conf-step">
      <ConfStepHeader title="Конфигурация цен" />

      <div className="conf-step__wrapper">
        { halls && halls.data && hall && (
          <>
            <SwitchSelector groupName="prices-hall" title="Выберите зал для конфигурации:" data={halls.data} checked={hallID} onChange={onHallCheckHandler} />

            <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
            <div className="conf-step__legend">
              <label className="conf-step__label">
                Цена, рублей
                <input
                  type="text"
                  className="conf-step__input"
                  placeholder="0"
                  name="price"
                  value={hall.price}
                  onChange={onChangeHandler}
                  disabled={hall.sale}
                />
              </label>
              за
              <span className="conf-step__chair conf-step__chair_standart" />
              обычные кресла
            </div>
            <div className="conf-step__legend">
              <label className="conf-step__label">
                Цена, рублей
                <input
                  type="text"
                  className="conf-step__input"
                  placeholder="0"
                  name="priceVip"
                  value={hall.priceVip}
                  onChange={onChangeHandler}
                  disabled={hall.sale}
                />
              </label>
              за
              <span className="conf-step__chair conf-step__chair_vip" />
              VIP кресла
            </div>

            <fieldset className="conf-step__buttons text-center">
              <AcceptinButton
                className="conf-step__button conf-step__button-regular"
                title="Отмена"
                onClick={() => onHallCheckHandler(hallID)}
              />
              <AcceptinButton className="conf-step__button conf-step__button-accent" onClick={onUpdateHandler}>
                { halls.updating && !halls.updatingError && 'Сохраняем...' }
                { !halls.updating && !halls.updatingSuccess && !halls.updatingError && 'Сохранить' }
                { halls.updatingSuccess && !halls.updatingError && 'Сохранено!' }
                { halls.updatingError && 'Ошибка. Попробовать еще' }
              </AcceptinButton>
            </fieldset>
          </>
        )}
      </div>
    </section>
  );
}

AdminPrices.propTypes = {
  halls: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      priceVip: PropTypes.number.isRequired,
      sale: PropTypes.number.isRequired,
    })).isRequired,
    updating: PropTypes.bool.isRequired,
    updatingError: PropTypes.PropTypes.shape({ message: PropTypes.string }),
    updatingSuccess: PropTypes.bool.isRequired,
  }),
  hall: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priceVip: PropTypes.number.isRequired,
    sale: PropTypes.number.isRequired,
  }),
  hallID: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
  onChangeHall: PropTypes.func.isRequired,
};

AdminPrices.defaultProps = {
  halls: null,
  hall: null,
  onUpdate: () => {},
};

const mapStateToProps = (state) => ({
  ...state.prices,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeHall: (hall) => dispatch(adminPricesChangeHall(hall)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPrices);
