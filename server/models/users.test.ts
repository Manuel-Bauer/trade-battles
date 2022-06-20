import { User } from '@prisma/client';
import { MockContext, Context, createMockContext } from '../context';
//@ts-ignore
import { getAllUsers, createUser, getUser, updateWatchlist } from './users.model';

let mockCtx: MockContext;
let ctx: Context;

const firstUser: User = {
  familyName: 'Buz',
  givenName: 'Maxim',
  google_id: 'p93712henp237o',
  photo:
    'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
  email: 'test@tester.com',
  id: 1,
  watchlist: [],
};

const secondUser: User = {
  familyName: 'Luca',
  givenName: 'Stendardo',
  google_id: '1302rnou2ü38',
  photo:
    'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
  email: 'luca@stendardo.com',
  id: 1,
  watchlist: [],
};

const incorrectUser = {
  familyName: 'Luca',
  givenName: 'Stendardo',
  id: '1302rnou2ü38',
  photo:
    'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
  email: 'luca@stendardo.com',
  watchlist: [],
};

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test('should creat new users', async () => {
  mockCtx.prisma.user.create.mockResolvedValue(firstUser);
  await expect(createUser(firstUser, ctx)).resolves.toEqual(firstUser);

  mockCtx.prisma.user.create.mockResolvedValue(secondUser);
  await expect(createUser(secondUser, ctx)).resolves.toEqual(secondUser);
});

test('should fail to create user on incorrect input', async () => {
  mockCtx.prisma.user.create.mockRejectedValue(new Error('Failed to create user!'));
  await expect(createUser(incorrectUser, ctx)).rejects.toEqual(new Error('Failed to create user!'));
});

test('should get all users', async () => {
  mockCtx.prisma.user.findMany.mockResolvedValue([firstUser, secondUser]);
  await expect(getAllUsers(ctx)).resolves.toEqual([firstUser, secondUser]);
});

test('should get a single user by google id', async () => {
  mockCtx.prisma.user.findUnique.mockResolvedValue(secondUser);
  await expect(getUser('1302rnou2ü38', ctx)).resolves.toEqual(secondUser);
});

test('should update watchlist of users', async () => {
  mockCtx.prisma.user.update.mockResolvedValue({ ...secondUser, watchlist: ['TSLA'] });
  await expect(updateWatchlist('1302rnou2ü38', ['TSLA'], ctx)).resolves.toEqual({
    ...secondUser,
    watchlist: ['TSLA'],
  });
});
