import { Battle, Prisma, User } from '@prisma/client';

export const firstUserInput = {
  familyName: 'Buz',
  givenName: 'Maxim',
  id: 'p93712henp237o',
  photo:
    'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
  email: 'test@tester.com',
};

export const firstUserResult: User = {
  familyName: 'Buz',
  givenName: 'Maxim',
  google_id: 'p93712henp237o',
  photo:
    'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
  email: 'test@tester.com',
  id: 1,
  watchlist: [],
};

export const secondUserInput = {
  familyName: 'Luca',
  givenName: 'Stendardo',
  id: '1302rnou2ü38',
  photo:
    'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
  email: 'luca@stendardo.com',
};

export const secondUserResult: User = {
  familyName: 'Luca',
  givenName: 'Stendardo',
  google_id: '1302rnou2ü38',
  id: 2,
  photo:
    'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
  email: 'luca@stendardo.com',
  watchlist: [],
};

export const incorrectUserInput = {
  familyName: 'Luca',
  givenName: 'Stendardo',
  photo:
    'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
  email: 'luca@stendardo.com',
};

export const firstBattleInput = {
  budget: 10000000, // Note: expects cents
  battle_name: 'First Battle',
  start_date: new Date('2022-06-20T14:19:02.370Z'),
  end_date: new Date('2022-06-22T14:19:02.370Z'),
  users: [{ id: 1 }, { id: 2 }],
};

type BattleWithUsers = Prisma.BattleGetPayload<{ include: { users: true } }>;
export const firstBattleResult: BattleWithUsers = {
  budget: 10000000, // Note: expects cents
  battle_name: 'First Battle',
  start_date: new Date('2022-06-20T14:19:02.370Z'),
  end_date: new Date('2022-06-22T14:19:02.370Z'),
  completed: false,
  winner: null,
  users: [firstUserResult, secondUserResult],
  id: 1,
};
