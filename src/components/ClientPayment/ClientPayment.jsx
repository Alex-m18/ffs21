/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import ClientHeader from '../ClientHeader/ClientHeader';
import { ticketPaymentClear, ticketPaymentRequest } from '../../redux/payment/actions';
import Preloader from '../Preloader/Preloader';
import AcceptinButton from '../AcceptinButton/AcceptinButton';

export default function ClientPayment() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { chosenSeance } = useSelector((state) => state.client);
  const { id, loading, error } = useSelector((state) => state.payment);

  useEffect(() => () => { dispatch(ticketPaymentClear()); }, [dispatch]); // component will unmount

  useEffect(() => {
    if (id) history.push(`/ticket/${id}`);
    return () => {};
  }, [id, history]);

  let date;
  let movie;
  let hall;
  let seats;
  if (chosenSeance) {
    date = chosenSeance.date;
    movie = chosenSeance.movie;
    hall = chosenSeance.hall;
    seats = chosenSeance.seats;
  }

  let selectedSum;
  let selectedSeats;
  let seatsString = '';
  if (seats) {
    selectedSum = seats
      .filter((o) => o.selected)
      .reduce((acc, o) => acc + (o.type === 'standart' ? hall.price : hall.priceVip), 0);
    selectedSeats = seats.filter((o) => o.selected);
    seatsString = selectedSeats.map((o) => o.number).join(', ');
  }

  const handleToHomeClick = () => history.push('/');

  const handleSubmitClick = () => {
    if (!selectedSeats.length) return;
    const ids = selectedSeats.map((o) => o.id);
    dispatch(ticketPaymentRequest(ids));
  };

  const handleReturnClick = () => history.push(`/hall/${chosenSeance.id}`);

  return (
    <main>
      <section className="ticket">
        { !selectedSeats && <AcceptinButton title="Выбрать билеты" onClick={handleToHomeClick} /> }
        { selectedSeats && (
          <>
            <ClientHeader title="Вы выбрали билеты:" />

            <div className="ticket__info-wrapper">
              <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movie.title}</span></p>
              <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{seatsString}</span></p>
              <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hall.title}</span></p>
              <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{moment(date).format('DD.MM.yyyy HH:mm')}</span></p>
              <p className="ticket__info">Стоимость: <span className="ticket__details ticket__cost">{selectedSum}</span> рублей</p>

              { !error && loading && <Preloader /> }
              { !error && !loading && (
                <AcceptinButton title="Получить код бронирования" onClick={handleSubmitClick} />
              )}
              { error && (
                <>
                  <p className="ticket__hint">Произошла ошибка, возможно места уже заняты. Пожалуйста, вернитесь на страницу выбора мест</p><br />
                  <AcceptinButton title="Вернуться" onClick={handleReturnClick} />
                </>
              )}

              <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
              <p className="ticket__hint">Приятного просмотра!</p>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
