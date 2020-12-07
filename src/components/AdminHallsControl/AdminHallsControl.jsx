/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import AcceptinButton from '../AcceptinButton/AcceptinButton';
import PopupForm from '../PopupForm/PopupForm';
import {
  adminHallsAddFormShow,
  adminHallsAddFormHide,
  adminHallsAddFormChange,
  adminHallsRemoveFormShow,
  adminHallsRemoveFormHide,
  adminHallsRemoveFormChange,
} from '../../redux/adminHallsControl/actions';
import ConfStepHeader from '../ConfStepHeader/ConfStepHeader';

function AdminHallsControl(props) {
  const {
    halls,
    onAdd,
    onRemove,
    addFormData,
    showAddForm,
    onFormShow,
    onFormClose,
    onFormChange,
    removeFormData,
    showRemoveForm,
    onRemoveFormShow,
    onRemoveFormClose,
    onRemoveFormChange,
  } = props;

  const addHandler = () => {
    if (addFormData.title !== '') {
      onAdd(addFormData);
      onFormClose();
    }
  };
  const onChangeHandler = (name, value) => onFormChange({ [`${name}`]: value });

  const onRemoveFormShowHandler = (id) => {
    onRemoveFormChange({
      id,
      title: `Вы действительно хотите удалить зал «${halls.data.find((o) => o.id === id).title}»?
      Все сеансы в этом зале будут отменены, а все проданные билеты в этот зал будут аннулированы!`,
    });
    onRemoveFormShow();
  };
  const onRemoveHallHandler = () => {
    onRemove(removeFormData.id);
    onRemoveFormClose();
  };

  return (
    <section className="conf-step">
      <ConfStepHeader title="Управление залами" />
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Доступные залы:</p>
        { halls.loading && <Preloader /> }
        { !halls.loadingError && !halls.loading && halls.data && (
          <ul className="conf-step__list">
            { halls.data.map((hall) => (
              <li key={hall.title}>
                {hall.title}
                { !hall.removing && <AcceptinButton className="conf-step__button conf-step__button-trash" onClick={() => onRemoveFormShowHandler(hall.id)} /> }
                { hall.removing && '. Удаляем...' }
                { hall.removingError && ' Ошибка удаления' }
              </li>
            ))}
            { halls.adding && <li key="hall_adding">Добавляем...</li> }
            { halls.addingError && <li key="hall_adding">Ошибка добавления</li> }
          </ul>
        )}
        <AcceptinButton className="conf-step__button conf-step__button-accent" onClick={onFormShow} title="Создать зал" />
      </div>

      { showAddForm && (
        <PopupForm
          title="Добавление зала"
          fields={[{
            title: 'Название зала',
            type: 'text',
            name: 'title',
            value: addFormData.title,
            placeholder: 'Например, «Зал 1»',
            required: true,
          }]}
          submitTitle="Добавить зал"
          onChange={onChangeHandler}
          onSubmit={addHandler}
          onClose={onFormClose}
        />
      )}

      { showRemoveForm && (
        <PopupForm
          title="Удаление зала"
          fields={[{
            title: removeFormData.title,
            type: 'message',
            name: 'id',
            value: removeFormData.id,
          }]}
          submitTitle="Удалить"
          onSubmit={onRemoveHallHandler}
          onClose={onRemoveFormClose}
        />
      )}
    </section>
  );
}

AdminHallsControl.propTypes = {
  halls: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      removing: PropTypes.bool,
      removingError: PropTypes.shape({ message: PropTypes.string }),
    })),
    loading: PropTypes.bool.isRequired,
    loadingError: PropTypes.shape({ message: PropTypes.string }),
    adding: PropTypes.bool.isRequired,
    addingError: PropTypes.shape({ message: PropTypes.string }),
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onFormShow: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onRemoveFormShow: PropTypes.func.isRequired,
  onRemoveFormClose: PropTypes.func.isRequired,
  onRemoveFormChange: PropTypes.func.isRequired,
  showAddForm: PropTypes.bool.isRequired,
  showRemoveForm: PropTypes.bool.isRequired,
  addFormData: PropTypes.shape({ title: PropTypes.string }).isRequired,
  removeFormData: PropTypes.shape({ id: PropTypes.string, title: PropTypes.string }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.hallsControl,
});

const mapDispatchToProps = (dispatch) => ({
  onFormShow: () => dispatch(adminHallsAddFormShow()),
  onFormClose: () => dispatch(adminHallsAddFormHide()),
  onFormChange: (data) => dispatch(adminHallsAddFormChange(data)),
  onRemoveFormShow: () => dispatch(adminHallsRemoveFormShow()),
  onRemoveFormClose: () => dispatch(adminHallsRemoveFormHide()),
  onRemoveFormChange: (data) => dispatch(adminHallsRemoveFormChange(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminHallsControl);
