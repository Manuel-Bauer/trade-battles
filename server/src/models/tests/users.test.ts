import { MockContext, Context, createMockContext } from '../../testing/context';
import { firstUser, incorrectUser, secondUser } from '../../testing/mocks';
//@ts-ignore
import {
  getAllUsers,
  createUser,
  getUser,
  updateWatchlist,
} from '../users.model';

let mockCtx: MockContext;
let ctx: Context;

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

test('should get all users', async () => {
  mockCtx.prisma.user.findMany.mockResolvedValue([firstUser, secondUser]);
  await expect(getAllUsers(ctx)).resolves.toEqual([firstUser, secondUser]);
});

test('should get a single user by google id', async () => {
  mockCtx.prisma.user.findUnique.mockResolvedValue(secondUser);
  await expect(getUser('1302rnou2ü38', ctx)).resolves.toEqual(secondUser);
});

test('should update watchlist of users', async () => {
  mockCtx.prisma.user.update.mockResolvedValue({
    ...secondUser,
    watchlist: ['TSLA'],
  });
  await expect(updateWatchlist('1302rnou2ü38', ['TSLA'], ctx)).resolves.toEqual(
    {
      ...secondUser,
      watchlist: ['TSLA'],
    }
  );
});

test('should not create italian users', async () => {
  mockCtx.prisma.user.create.mockRejectedValue(new Error());
  await expect(createUser(incorrectUser, ctx)).rejects.toEqual(new Error());
});
