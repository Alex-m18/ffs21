const moment = require('moment');
const uuid = require('uuid').v4;
const Movies = require('../../app/models/Movies');

exports.name = 'movieSeeder';

const data = [
  {
    id: uuid(),
    title: 'Звёздные войны XXIII: Атака клонированных клонов',
    description: 'Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.',
    duration: 130,
    origin: 'США',
    posterTitle: 'poster1',
    posterLink: 'i/poster1.jpg',
  },
  {
    id: uuid(),
    title: 'Альфа',
    description: '20 тысяч лет назад Земля была холодным и неуютным местом, в котором смерть подстерегала человека на каждом шагу.',
    duration: 96,
    origin: 'Франция',
    posterTitle: 'Альфа постер',
    posterLink: 'i/poster2.jpg',
  },
  {
    id: uuid(),
    title: 'Хищник',
    description: 'Самые опасные хищники Вселенной, прибыв из глубин космоса, высаживаются на улицах маленького городка, чтобы начать свою кровавую охоту. Генетически модернизировав себя с помощью ДНК других видов, охотники стали ещё сильнее, умнее и беспощаднее.',
    duration: 101,
    origin: 'Канада, США',
    posterTitle: 'Хищник постер',
    posterLink: 'i/poster2.jpg',
  }
];

exports.run = async (db) => {
  const movies = new Movies(db);
  return await movies.push(data);
}
