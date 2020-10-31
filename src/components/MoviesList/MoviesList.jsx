import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import DaysNavigator from '../DaysNavigator/DaysNavigator';
import MovieCard from '../MovieCard/MovieCard';
import { changeClientState } from '../../redux/client/actions';
import { clientSeancesClear, clientSeancesRequest } from '../../redux/clientSeances/actions';
import { clientHallsClear, clientHallsRequest } from '../../redux/clientHalls/actions';
import { clientMoviesClear, clientMoviesRequest } from '../../redux/clientMovies/actions';

export default function MoviesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { chosenDate } = useSelector((state) => state.client);
  const { seances } = useSelector((state) => state.clientSeances);
  const { halls } = useSelector((state) => state.clientHalls);
  const { movies } = useSelector((state) => state.clientMovies);

  useEffect(() => () => {
    dispatch(changeClientState({
      chosenSeance: null,
      chosenSeats: null,
    }));
    dispatch(clientHallsClear());
    dispatch(clientMoviesClear());
    dispatch(clientSeancesClear());
  }, [dispatch]);

  useEffect(() => {
    // dispatch(clientMoviesClear());
    // dispatch(clientHallsClear());
    dispatch(clientSeancesRequest({
      date: chosenDate,
    }));
    return () => {};
  }, [chosenDate, dispatch]);

  useEffect(() => {
    if (!seances) return () => {};
    dispatch(clientHallsRequest(
      Array.from(new Set(seances.map((o) => o.hallID))),
    ));
    dispatch(clientMoviesRequest(
      Array.from(new Set(seances.map((o) => o.movieID))),
    ));
    return () => {};
  }, [seances, dispatch]);

  const combinedMovies = (seances && movies && halls)
    ? movies
      .map((movie) => ({
        ...movie,
        halls: halls
          .filter((hall) => seances
            .find((seance) => seance.movieID === movie.id && seance.hallID === hall.id))
          .map((hall) => ({
            ...hall,
            seances: seances
              .filter((seance) => moment(seance.date).isAfter(moment()))
              .filter((seance) => seance.movieID === movie.id && seance.hallID === hall.id)
              .map((seance) => ({ id: seance.id, time: moment(seance.date).format('HH:mm') })),
          })),
      }))
    : null;

  const handleDateChange = (newDate) => dispatch(changeClientState({ chosenDate: newDate }));

  const handleSeanceClick = (id) => {
    dispatch(changeClientState({ chosenSeance: { id } }));
    navigate('/hall');
  };

  return (
    <>
      <DaysNavigator date={chosenDate} onChange={handleDateChange} />

      <main>
        { !combinedMovies && <Preloader /> }
        {
          combinedMovies && combinedMovies
            .filter((movie) => movie.halls.filter((hall) => hall.seances.length).length)
            .map((movie) => (
              <MovieCard movie={movie} onSeanceClick={handleSeanceClick} key={movie.id} />
            ))
        }
      </main>
    </>
  );
}
