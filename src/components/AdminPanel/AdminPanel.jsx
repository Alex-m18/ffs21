import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminHallsControl from '../AdminHallsControl/AdminHallsControl';
import AdminSeats from '../AdminSeats/AdminSeats';
import AdminPrices from '../AdminPrices/AdminPrices';
import AdminSeances from '../AdminSeances/AdminSeances';
import AdminOpenSale from '../AdminOpenSale/AdminOpenSale';
import {
  adminHallsAddRequest,
  adminHallsRemoveRequest,
  adminHallsRequest,
  adminHallsUpdateRequest,
  adminHallsUpdateSuccessClear,
} from '../../redux/adminHalls/actions';

const AdminPanel = (props) => {
  const {
    halls,
    getHalls,
    onRemove,
    onAdd,
    onUpdate,
    clearUpdateSucces,
  } = props;

  useEffect(() => {
    getHalls();
    return () => {};
  }, [getHalls]);

  useEffect(() => {
    if (halls.updatingSuccess) setTimeout(clearUpdateSucces, 1000);
    return () => {};
  }, [halls, clearUpdateSucces]);

  return halls && (
    <>
      <AdminHallsControl halls={halls} onAdd={onAdd} onRemove={onRemove} />
      <AdminSeats halls={halls} onUpdate={onUpdate} />
      <AdminPrices halls={halls} onUpdate={onUpdate} />
      <AdminSeances halls={halls} />
      <AdminOpenSale halls={halls} onUpdate={onUpdate} />
    </>
  );
};

AdminPanel.propTypes = {
  halls: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      rows: PropTypes.number.isRequired,
      cols: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      priceVip: PropTypes.number.isRequired,
      sale: PropTypes.number.isRequired,
      removing: PropTypes.bool,
      removingError: PropTypes.shape({ message: PropTypes.string }),
    })).isRequired,
    loading: PropTypes.bool.isRequired,
    loadingError: PropTypes.shape({ message: PropTypes.string }),
    adding: PropTypes.bool.isRequired,
    addingError: PropTypes.PropTypes.shape({ message: PropTypes.string }),
    updating: PropTypes.bool.isRequired,
    updatingError: PropTypes.PropTypes.shape({ message: PropTypes.string }),
    updatingSuccess: PropTypes.bool.isRequired,
  }).isRequired,
  getHalls: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  clearUpdateSucces: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  halls: state.halls,
});

const mapDispatchToProps = (dispatch) => ({
  getHalls: () => dispatch(adminHallsRequest()),
  onRemove: (ids) => dispatch(adminHallsRemoveRequest(ids)),
  onAdd: (data) => dispatch(adminHallsAddRequest(data)),
  onUpdate: (hall) => dispatch(adminHallsUpdateRequest(hall)),
  clearUpdateSucces: () => dispatch(adminHallsUpdateSuccessClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
