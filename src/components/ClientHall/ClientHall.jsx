/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { changeClientState, clientChangeSeatSelection, clientSeanceRequest } from '../../redux/client/actions';
import AcceptinButton from '../AcceptinButton/AcceptinButton';

export default function ClientHall() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { seanceID } = useParams();
  const { chosenSeance } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(changeClientState({ chosenSeance: { id: seanceID } }));
    dispatch(clientSeanceRequest(seanceID));
    return () => {};
  }, [seanceID, dispatch]);

  let movie;
  let hall;
  let seats;
  let selectedSeats = [];
  if (chosenSeance) {
    movie = chosenSeance.movie;
    hall = chosenSeance.hall;
    seats = chosenSeance.seats;
  }

  const rows = [];
  if (hall) {
    let i = 0;
    for (let row = 0; row < hall.rows; row += 1) {
      const rowArr = [];
      for (let column = 0; column < hall.cols; column += 1) {
        rowArr.push(seats[i]);
        i += 1;
      }
      rows.push(rowArr);
    }
  }

  let selectedSum;
  if (seats) {
    selectedSeats = seats.filter((o) => o.selected);
    selectedSum = selectedSeats.reduce((acc, o) => (
      acc + (o.state === 'standart' ? hall.price : hall.priceVip)
    ), 0);
  }

  const handleSelectClick = (id) => {
    const seat = seats.find((o) => o.id === id);
    if (!seat) return;
    if (['disabled', 'taken'].includes(seat.state)) return;
    dispatch(clientChangeSeatSelection({
      id,
      selected: !seat.selected,
    }));
  };

  const handleSubmitClick = () => {
    if (!selectedSeats.length) return;
    dispatch(changeClientState({
      chosenSeats: '',
    }));
    navigate('/payment');
  };

  return (
    <>
      { !(chosenSeance && movie && hall && seats) && <Preloader /> }
      { (chosenSeance && movie && hall && seats) && (
        <main>
          <section className="buying">
            <div className="buying__info">
              <div className="buying__info-description">
                <h2 className="buying__info-title">{movie.title}</h2>
                <p className="buying__info-start">{`Начало сеанса: ${moment(chosenSeance.date).format('HH:mm')}`}</p>
                <p className="buying__info-hall">{hall.title}</p>
              </div>
              { /*
                <div className="buying__info-hint">
                  <p>
                    Тапните дважды,<br />
                    чтобы увеличить
                  </p>
                </div>
              */ }
            </div>
            <div className="buying-scheme">
              <div className="buying-scheme__wrapper">
                { rows.map((row, index) => (
                  <div className="buying-scheme__row" key={`row${index}`}>
                    { row.map((seat) => (
                      // eslint-disable-next-line jsx-a11y/control-has-associated-label
                      <span
                        role="button"
                        tabIndex={0}
                        className={`buying-scheme__chair buying-scheme__chair_${seat.selected ? 'selected' : seat.state} `}
                        key={seat.id}
                        onClick={() => handleSelectClick(seat.id)}
                        onKeyPress={(evt) => { if (evt.key === 'Enter') handleSelectClick(seat.id); }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="buying-scheme__legend">
                <div className="col">
                  <p className="buying-scheme__legend-price">
                    <span className="buying-scheme__chair buying-scheme__chair_standart" />
                    Свободно (<span className="buying-scheme__legend-value">{hall.price}</span>руб)
                  </p>
                  <p className="buying-scheme__legend-price">
                    <span className="buying-scheme__chair buying-scheme__chair_vip" />
                    Свободно VIP (<span className="buying-scheme__legend-value">{hall.priceVip}</span>руб)
                  </p>
                </div>
                <div className="col">
                  <p className="buying-scheme__legend-price">
                    <span className="buying-scheme__chair buying-scheme__chair_taken" />
                    Занято
                  </p>
                  <p className="buying-scheme__legend-price">
                    <span className="buying-scheme__chair buying-scheme__chair_selected" />
                    {`Выбрано${selectedSum ? ` на ${selectedSum} руб.` : ''}`}
                  </p>
                </div>
              </div>
            </div>

            { selectedSeats.length && <AcceptinButton title="Забронировать" onClick={handleSubmitClick} /> }
          </section>
        </main>
      )}
    </>
  );
}
