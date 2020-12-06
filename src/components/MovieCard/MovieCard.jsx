import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function MovieCard({ basename, movie }) {
  return (
    <section className="movie">
      <div className="movie__info">
        <div className="movie__poster">
          <img className="movie__poster-image" alt={movie.posterTitle} src={`${basename}/${movie.posterLink}`} />
        </div>
        <div className="movie__description">
          <h2 className="movie__title">{movie.title}</h2>
          <p className="movie__synopsis">{movie.description}</p>
          <p className="movie__data">
            <span className="movie__data-duration">{`${movie.duration} минут, `}</span>
            <span className="movie__data-origin">{movie.origin}</span>
          </p>
        </div>
      </div>

      {movie.halls
        .filter((hall) => hall.seances.length)
        .sort((a, b) => {
          if (a.title > b.title) return 1;
          return -1;
        })
        .map((hall) => (
          <div className="movie-seances__hall" key={hall.id}>
            <h3 className="movie-seances__hall-title">{hall.title}</h3>
            <ul className="movie-seances__list">
              {hall.seances
                .sort((a, b) => {
                  if (moment(a.date).isAfter(moment(b.date))) return 1;
                  return -1;
                }).map((seance) => (
                  <li className="movie-seances__time-block" key={seance.id}>
                    <Link to={`/hall/${seance.id}`} className="movie-seances__time">
                      {seance.time}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </section>
  );
}

MovieCard.propTypes = {
  basename: PropTypes.string,
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    origin: PropTypes.string.isRequired,
    posterTitle: PropTypes.string,
    posterLink: PropTypes.string,
    halls: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      seances: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
      })),
    })),
  }).isRequired,
};

MovieCard.defaultProps = {
  basename: '',
};
