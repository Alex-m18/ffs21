/* eslint-disable no-extra-boolean-cast */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfStepHeader from '../ConfStepHeader/ConfStepHeader';
import AcceptinButton from '../AcceptinButton/AcceptinButton';
import SwitchSelector from '../SwitchSelector/SwitchSelector';
import { adminOpenSaleChangeHall } from '../../redux/adminOpenSales/actions';

function AdminOpenSale(props) {
  const {
    halls,
    onUpdate,
    hall,
    hallID,
    onChangeHall,
    seances,
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

  const onUpdateHandler = () => {
    if (halls && halls.updating) return;

    if (hall) {
      if (!hall.sale && !seances.data.find((o) => o.hallID === hallID)) {
        // eslint-disable-next-line no-alert
        alert('Ошибка! Нельзя открыть продажи - в зале нет сеансов');
        return;
      }
      onUpdate({ ...hall, sale: !hall.sale });
    }
  };

  return (
    <section className="conf-step">
      <ConfStepHeader title="Открыть продажи" />
      <div className="conf-step__wrapper">
        <SwitchSelector
          groupName="sales-hall"
          title="Выберите зал:"
          data={halls.data}
          checked={hallID}
          onChange={onHallCheckHandler}
        />

        { hall && (
          <div className="conf-step__wrapper text-center">
            <AcceptinButton className="conf-step__button conf-step__button-accent" onClick={onUpdateHandler}>
              { !Boolean(hall.sale) && halls.updating && !halls.updatingError && 'Открываем продажи...' }
              { Boolean(hall.sale) && halls.updating && !halls.updatingError && 'Закрываем продажи...' }
              { Boolean(hall.sale) && !halls.updating && !halls.updatingError && 'Закрыть продажу билетов' }
              { !Boolean(hall.sale) && !halls.updating && !halls.updatingError && 'Открыть продажу билетов' }
              { halls.updatingError && 'Ошибка. Попробовать еще' }
            </AcceptinButton>
          </div>
        )}
      </div>
    </section>
  );
}

AdminOpenSale.propTypes = {
  halls: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      sale: PropTypes.number.isRequired,
    })).isRequired,
    updating: PropTypes.bool.isRequired,
    updatingError: PropTypes.PropTypes.shape({ message: PropTypes.string }),
    updatingSuccess: PropTypes.bool.isRequired,
  }),
  hall: PropTypes.shape({
    id: PropTypes.string.isRequired,
    sale: PropTypes.number.isRequired,
  }),
  hallID: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
  onChangeHall: PropTypes.func.isRequired,
  seances: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      hallID: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

AdminOpenSale.defaultProps = {
  halls: null,
  hall: null,
  onUpdate: () => {},
};

const mapStateToProps = (state) => ({
  ...state.openSale,
  seances: state.seances,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeHall: (hall) => dispatch(adminOpenSaleChangeHall(hall)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOpenSale);
