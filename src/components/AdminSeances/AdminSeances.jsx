/* eslint-disable no-mixed-operators */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import moment from 'moment';
import ConfStepHeader from '../ConfStepHeader/ConfStepHeader';
import PopupForm from '../PopupForm/PopupForm';
import AcceptinButton from '../AcceptinButton/AcceptinButton';
import {
  adminMoviesAddFormChange,
  adminMoviesAddFormHide,
  adminMoviesAddFormShow,
  adminMoviesAdd,
  adminMoviesRequest,
  adminMoviesSaveRequest,
  adminMoviesSaveSuccessClear,
  adminMoviesSuccessClear,
} from '../../redux/adminMovies/actions';
import {
  adminSeancesAdd,
  adminSeancesAddFormChange,
  adminSeancesAddFormHide, adminSeancesAddFormShow,
  adminSeancesRemove,
  adminSeancesRemoveFormChange,
  adminSeancesRemoveFormHide,
  adminSeancesRemoveFormShow,
  adminSeancesRequest,
  adminSeancesSaveRequest,
  adminSeancesSaveSuccessClear,
} from '../../redux/adminSeances/actions';

const colorList = ['#caff85', '#85ff89', '#85ffd3', '#85e2ff', '#8599ff', '#ba85ff', '#ff85fb', '#ff85b1', '#ffa285'];

function AdminSeances(props) {
  const {
    halls,
    movies,
    getMovies,
    onAddMovieFormShow,
    onAddMovieFormHide,
    onAddMovieFormChange,
    addMovie,
    saveMovies,
    loadingMoviesSuccessClear,
    saveMoviesSuccessClear,
    seances,
    getSeances,
    onAddSeanceFormShow,
    onAddSeanceFormHide,
    onAddSeanceFormChange,
    addSeance,
    saveSeances,
    saveSeancesSuccessClear,
    onRemoveSeanceFormShow,
    onRemoveSeanceFormHide,
    onRemoveSeanceFormChange,
    onSeanceRemove,
  } = props;

  const refreshHandler = () => {
    getMovies();
  };
  useEffect(() => {
    if (!movies.loadingSuccess) return () => {};
    getSeances();
    loadingMoviesSuccessClear();
    return () => {};
  }, [movies]);

  useEffect(() => {
    refreshHandler();
    return () => {};
  }, []);

  const onSaveHandler = () => {
    saveMovies(movies.data.filter((o) => !o.id));
  };
  useEffect(() => {
    if (!movies.savingSuccess) return () => {};
    saveSeances(seances.data.filter((o) => !o.id || o.removed));
    setTimeout(() => saveMoviesSuccessClear(), 1000);
    return () => {};
  }, [movies]);
  useEffect(() => {
    if (!seances.savingSuccess) return () => {};
    setTimeout(() => saveSeancesSuccessClear(), 1000);
    return () => {};
  }, [seances]);

  const onChangeHandler = (callback) => (name, value) => callback({ [`${name}`]: value });
  const onAddMovieFormChangeHandler = onChangeHandler(onAddMovieFormChange);
  const onAddSeanceFormChangeHandler = onChangeHandler(onAddSeanceFormChange);

  const onAddHandler = (formData, onAddCallback/* , formCloseCallback = () => {} */) => () => {
    if ([...Object.values(formData)].every((o) => o !== '')) {
      onAddCallback(formData);
      // formCloseCallback();
    }
  };
  const onAddMovieHandler = onAddHandler(movies.addForm.data, addMovie, onAddMovieFormHide);
  const onAddSeanceHandler = onAddHandler(seances.addForm.data, addSeance, onAddSeanceFormHide);

  const onAddSeanceFormShowHandler = (movieID) => {
    if (!movieID) {
      // eslint-disable-next-line no-alert
      alert('Сначала сохраните изменения');
      return;
    }
    if (!halls.data.length) {
      // eslint-disable-next-line no-alert
      alert('Сначала добавьте залы');
      return;
    }
    onAddSeanceFormChange({ movieID, hallID: halls.data[0].id });
    onAddSeanceFormShow();
  };

  const onRemoveSeanceFormShowHandler = (seance) => {
    onRemoveSeanceFormChange({
      data: {
        seance,
        title: `Вы действительно хотите снять с сеанса фильм «${movies.data.find((o) => o.id === seance.movieID).title}»?`,
      },
    });
    onRemoveSeanceFormShow();
  };
  const onRemoveSeanceHandler = () => {
    onSeanceRemove(seances.removeForm.data.seance);
    onRemoveSeanceFormHide();
  };

  const [timeline, setTimeline] = useState(1440);
  useEffect(() => {
    if (!seances.data.length) return () => {};
    const tl = seances.data
      .filter((o) => !o.removed)
      .reduce((acc, cur) => {
        const curMinutes = moment(cur.date).diff(moment(seances.data[0].date), 'minutes')
          + movies.data.find((o) => o.id === cur.movieID).duration;
        if (curMinutes > acc) return curMinutes;
        return acc;
      }, 1);
    setTimeline(tl);
    return () => {};
  }, [seances]);

  const [colors, setColors] = useState({});
  useEffect(() => {
    if (!movies.data.length) return () => {};
    let i = 0;
    setColors(movies.data.reduce((acc, cur) => ({
      ...acc,
      // eslint-disable-next-line no-plusplus
      [`${cur.title}`]: colorList[i++ % colorList.length],
    }), {}));
    return () => {};
  }, [movies]);

  return (
    <section className="conf-step">

      <ConfStepHeader title="Сетка сеансов" />

      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">
          <AcceptinButton
            className="conf-step__button conf-step__button-accent"
            title="Добавить фильм"
            onClick={onAddMovieFormShow}
          />
        </p>

        <div className="conf-step__movies">
          { movies && movies.data.map((movie) => (
            <div
              className="conf-step__movie"
              key={nanoid()}
              style={{ backgroundColor: colors[movie.title] }}
              onClick={() => onAddSeanceFormShowHandler(movie.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(evt) => { if (evt.key === 'Enter') onAddSeanceFormShowHandler(movie.id); }}
            >
              <img className="conf-step__movie-poster" alt="poster" src={movie.posterLink} />
              <h3 className="conf-step__movie-title">{movie.title}</h3>
              <p className="conf-step__movie-duration">{`${movie.duration} минут`}</p>
            </div>
          ))}
        </div>

        <div className="conf-step__seances">
          { halls.data.map((hall) => (
            <div className="conf-step__seances-hall" key={nanoid()}>
              <h3 className="conf-step__seances-title">{hall.title}</h3>
              <div className="conf-step__seances-timeline">
                { seances && seances.data
                  .filter((o) => o.hallID === hall.id && !o.removed)
                  .map((seance) => (
                    <div
                      className="conf-step__seances-movie"
                      key={nanoid()}
                      style={{
                        width: `${movies.data.find((o) => o.id === seance.movieID).duration / timeline * 100}%`,
                        backgroundColor: colors[
                          movies.data.find((o) => o.id === seance.movieID).title
                        ],
                        left: `${moment(seance.date).diff(moment(seances.data[0].date), 'minutes') / timeline * 100}%`,
                      }}
                      title={`${moment(seance.date).format('DD.MM.YYYY, HH:mm')}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => onRemoveSeanceFormShowHandler(seance)}
                      onKeyPress={(evt) => { if (evt.key === 'Enter') onRemoveSeanceFormShowHandler(seance); }}
                    >
                      <p className="conf-step__seances-movie-title">{movies.data.find((o) => o.id === seance.movieID).title}</p>
                      <p className="conf-step__seances-movie-start">{moment(seance.date).format('HH:mm')}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <fieldset className="conf-step__buttons text-center">
          <AcceptinButton
            className="conf-step__button conf-step__button-regular"
            title="Отмена"
            onClick={refreshHandler}
          />

          <AcceptinButton className="conf-step__button conf-step__button-accent" onClick={onSaveHandler}>
            { movies.saving && 'Сохраняем фильмы...' }
            { seances.saving && 'Сохраняем сеансы...' }
            { !(movies.saving || seances.saving)
              && !(movies.savingSuccess || seances.savingSuccess)
              && !(movies.savingError || seances.savingError)
              && 'Сохранить' }
            { (seances.savingSuccess)
              && 'Сохранено!' }
            { (movies.savingError || seances.savingError)
              && 'Ошибка. Попробовать еще' }
          </AcceptinButton>
        </fieldset>
      </div>

      { movies.addForm.show && (
        <PopupForm
          title="Добавление фильма"
          fields={[
            {
              title: 'Название фильма',
              type: 'text',
              name: 'title',
              value: movies.addForm.data.title,
              placeholder: 'Например, «Гражданин Кейн»',
              required: true,
            },
            {
              title: 'Описание фильма',
              type: 'text',
              name: 'description',
              value: movies.addForm.data.description,
              placeholder: '',
              required: true,
            },
            {
              title: 'Страна',
              type: 'text',
              name: 'origin',
              value: movies.addForm.data.origin,
              placeholder: 'Россия',
              required: true,
            },
            {
              title: 'Длительность в минутах',
              type: 'text',
              name: 'duration',
              value: movies.addForm.data.duration,
              placeholder: '90',
              required: true,
            },
          ]}
          submitTitle="Добавить фильм"
          onChange={onAddMovieFormChangeHandler}
          onSubmit={onAddMovieHandler}
          onClose={onAddMovieFormHide}
        />
      )}

      { seances.addForm.show && (
        <PopupForm
          title="Добавление сеанса"
          fields={[
            {
              title: 'Зал',
              type: 'option',
              options: halls.data.map((o) => ({ value: o.id, title: o.title })),
              name: 'hallID',
              value: seances.addForm.data.hallID,
              required: true,
            },
            {
              title: 'Название зала',
              type: 'text',
              value: seances.addForm.data.date,
              placeholder: moment().format('DD.MM.YYYY, HH:mm'),
              name: 'date',
              required: true,
            },
          ]}
          submitTitle="Добавить сеанс"
          onChange={onAddSeanceFormChangeHandler}
          onSubmit={onAddSeanceHandler}
          onClose={onAddSeanceFormHide}
        />
      )}

      { seances.removeForm.show && (
        <PopupForm
          title="Снятие с сеанса"
          fields={[{
            title: seances.removeForm.data.title,
            type: 'message',
          }]}
          submitTitle="Удалить"
          onSubmit={onRemoveSeanceHandler}
          onClose={onRemoveSeanceFormHide}
        />
      )}

    </section>
  );
}

AdminSeances.propTypes = {
  getSeances: PropTypes.func.isRequired,
  halls: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  getMovies: PropTypes.func.isRequired,
  movies: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      origin: PropTypes.string.isRequired,
      posterTitle: PropTypes.string,
      posterLink: PropTypes.string,
    })).isRequired,
    addForm: PropTypes.shape({
      show: PropTypes.bool.isRequired,
      data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        origin: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    loadingError: PropTypes.shape({ message: PropTypes.string }),
    loadingSuccess: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    savingError: PropTypes.shape({ message: PropTypes.string }),
    savingSuccess: PropTypes.bool.isRequired,
  }).isRequired,
  seances: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      movieID: PropTypes.string.isRequired,
      hallID: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      state: PropTypes.string,
    })).isRequired,
    addForm: PropTypes.shape({
      show: PropTypes.bool.isRequired,
      data: PropTypes.shape({
        movieID: PropTypes.string.isRequired,
        hallID: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    removeForm: PropTypes.shape({
      show: PropTypes.bool.isRequired,
      data: PropTypes.shape({
        seance: PropTypes.shape({
          id: PropTypes.string,
          movieID: PropTypes.string.isRequired,
          hallID: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    loadingError: PropTypes.shape({ message: PropTypes.string }),
    saving: PropTypes.bool.isRequired,
    savingError: PropTypes.shape({ message: PropTypes.string }),
    savingSuccess: PropTypes.bool.isRequired,
  }).isRequired,
  onAddMovieFormShow: PropTypes.func.isRequired,
  onAddMovieFormHide: PropTypes.func.isRequired,
  onAddMovieFormChange: PropTypes.func.isRequired,
  addMovie: PropTypes.func.isRequired,
  saveMovies: PropTypes.func.isRequired,
  loadingMoviesSuccessClear: PropTypes.func.isRequired,
  saveMoviesSuccessClear: PropTypes.func.isRequired,
  onAddSeanceFormShow: PropTypes.func.isRequired,
  onAddSeanceFormHide: PropTypes.func.isRequired,
  onAddSeanceFormChange: PropTypes.func.isRequired,
  addSeance: PropTypes.func.isRequired,
  saveSeances: PropTypes.func.isRequired,
  saveSeancesSuccessClear: PropTypes.func.isRequired,
  onRemoveSeanceFormShow: PropTypes.func.isRequired,
  onRemoveSeanceFormHide: PropTypes.func.isRequired,
  onRemoveSeanceFormChange: PropTypes.func.isRequired,
  onSeanceRemove: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  seances: state.seances,
});

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => dispatch(adminMoviesRequest()),
  onAddMovieFormShow: () => dispatch(adminMoviesAddFormShow()),
  onAddMovieFormHide: () => dispatch(adminMoviesAddFormHide()),
  onAddMovieFormChange: (data) => dispatch(adminMoviesAddFormChange(data)),
  addMovie: (data) => dispatch(adminMoviesAdd(data)),
  saveMovies: (data) => dispatch(adminMoviesSaveRequest(data)),
  loadingMoviesSuccessClear: () => dispatch(adminMoviesSuccessClear()),
  saveMoviesSuccessClear: () => dispatch(adminMoviesSaveSuccessClear()),
  getSeances: () => dispatch(adminSeancesRequest()),
  onAddSeanceFormShow: () => dispatch(adminSeancesAddFormShow()),
  onAddSeanceFormHide: () => dispatch(adminSeancesAddFormHide()),
  onAddSeanceFormChange: (data) => dispatch(adminSeancesAddFormChange(data)),
  addSeance: (data) => dispatch(adminSeancesAdd(data)),
  saveSeances: (data) => dispatch(adminSeancesSaveRequest(data)),
  saveSeancesSuccessClear: () => dispatch(adminSeancesSaveSuccessClear()),
  onRemoveSeanceFormShow: () => dispatch(adminSeancesRemoveFormShow()),
  onRemoveSeanceFormHide: () => dispatch(adminSeancesRemoveFormHide()),
  onRemoveSeanceFormChange: (data) => dispatch(adminSeancesRemoveFormChange(data)),
  onSeanceRemove: (data) => dispatch(adminSeancesRemove(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminSeances);
