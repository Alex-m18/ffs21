/* eslint-disable object-curly-newline */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import ClientHeader from '../ClientHeader/ClientHeader';
import { ticketClear, ticketRequest } from '../../redux/ticket/actions';
import Preloader from '../Preloader/Preloader';
import AcceptinButton from '../AcceptinButton/AcceptinButton';

export default function ClientTicket() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, loading, error } = useSelector((state) => state.ticket);
  // const { chosenSeance } = useSelector((state) => state.client);

  const { ticketID } = useParams();

  useEffect(() => () => { dispatch(ticketClear()); }, [dispatch]); // component will unmount

  useEffect(() => {
    if (!ticketID) return () => {};
    dispatch(ticketRequest(ticketID));
    return () => {};
  }, [dispatch, ticketID]);

  let movie;
  let hall;
  let seats;
  if (data) {
    movie = data.movie;
    hall = data.hall;
    seats = data.seats;
  }

  let seatsString;
  if (seats) {
    seatsString = seats
      .slice(1)
      .reduce((acc, o) => `${acc}, ${o}`, seats[0]);
  }

  const handleToHomeClick = () => history.push('/');

  return (
    <main>
      <section className="ticket">
        <ClientHeader title="Электронный билет" />

        <div className="ticket__info-wrapper">
          { !error && loading && <Preloader /> }

          { !error && !loading && data && (
            <>
              <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movie.title}</span></p>
              <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{seatsString}</span></p>
              <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hall.title}</span></p>
              <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{moment(movie.date).format('DD.MM.yyyy, HH:mm')}</span></p>

              { ticketID && <QRCode className="ticket__info-qr" value={window.location.href} level="M" bgColor="#FFFFFF00" /> }

              <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
              <p className="ticket__hint">Приятного просмотра!</p>
            </>
          )}

          { error && (
            <>
              <p className="ticket__info">Ошибка! <span className="ticket__details ticket__title">Билет не найден</span></p>
              <AcceptinButton title="Выбрать билеты" onClick={handleToHomeClick} />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
