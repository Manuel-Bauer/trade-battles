import { User } from '@prisma/client';

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
  id: 1,
  watchlist: [],
};

export const incorrectUser = {
  familyName: 'Luca',
  givenName: 'Stendardo',
  id: '1302rnou2ü38',
  photo:
    'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
  email: 'luca@stendardo.com',
  watchlist: [],
};
