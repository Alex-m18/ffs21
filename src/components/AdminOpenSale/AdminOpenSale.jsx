import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfStepHeader from '../ConfStepHeader/ConfStepHeader';
import { adminOpenSaleRequest, adminOpenSaleSuccessClear } from '../../redux/adminOpenSales/actions';
import AcceptinButton from '../AcceptinButton/AcceptinButton';

function AdminOpenSale(props) {
  const {
    loading,
    success,
    error,
    onOpenSale,
    onSuccessClear,
  } = props;

  const [timer, setTimer] = useState(null);
  useEffect(() => {
    if (success) setTimer(setTimeout(() => onSuccessClear(), 1000));
    return () => clearTimeout(timer);
  }, [success]);

  return (
    <section className="conf-step">
      <ConfStepHeader title="Открыть продажи" />

      <div className="conf-step__wrapper text-center">
        <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
        <AcceptinButton className="conf-step__button conf-step__button-accent" onClick={onOpenSale}>
          { !loading && !success && !error && 'Открыть продажу билетов' }
          { loading && !success && !error && 'Открываем продажи...' }
          { !loading && success && !error && 'Продажи открыты!' }
          { !loading && !success && error && 'Что-то пошло не так. Попробовать еще' }
        </AcceptinButton>
      </div>
    </section>
  );
}

AdminOpenSale.propTypes = {
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.shape({ message: PropTypes.string }),
  onOpenSale: PropTypes.func.isRequired,
  onSuccessClear: PropTypes.func.isRequired,
};

AdminOpenSale.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  ...state.openSale,
});

const mapDispatchToProps = (dispacth) => ({
  onOpenSale: () => dispacth(adminOpenSaleRequest()),
  onSuccessClear: () => dispacth(adminOpenSaleSuccessClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOpenSale);
