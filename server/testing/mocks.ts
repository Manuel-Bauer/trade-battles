import { Battle, User } from '@prisma/client';

export const firstUser: User = {
  familyName: 'Buz',
  givenName: 'Maxim',
  google_id: 'p93712henp237o',
  photo:
    'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
  email: 'test@tester.com',
  id: 1,
  watchlist: [],
};

export const secondUser: User = {
  familyName: 'Luca',
  givenName: 'Stendardo',
  google_id: '1302rnou2ü38',
  photo:
    'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
  email: 'luca@stendardo.com',
  id: 2,
  watchlist: [],
};

export const incorrectUser: Partial<User> = {
  familyName: 'Luca',
  givenName: 'Stendardo',
  id: 3,
  photo:
    'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
  email: 'luca@stendardo.com',
  watchlist: [],
};

export const firstBattle: Battle = {
  budget: 10000000, // Note: expects cents
  battle_name: 'First Battle',
  start_date: new Date('2022-06-20T14:19:02.370Z'),
  end_date: new Date('2022-06-22T14:19:02.370Z'),
  completed: false,
  id: 1,
  winner: null,
};
