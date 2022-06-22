<<<<<<< HEAD:server/models/tests/users.test.ts
import { MockContext, Context, createMockContext } from '../../testing/context';
import { firstUser, incorrectUser, secondUser } from '../../testing/mocks';
//@ts-ignore
import { getAllUsers, createUser, getUser, updateWatchlist } from '../users.model';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
=======
import { cleanDB } from '../../testing/cleanDb';
import prisma from '../../testing/client';
import {
  firstUserInput,
  firstUserResult,
  incorrectUserInput,
  secondUserInput,
  secondUserResult,
} from '../../testing/mocks';

//@ts-ignore
import { getAllUsers, createUser, getUser, updateWatchlist } from '../users.model';

beforeAll(async () => {
  await cleanDB();
});

afterAll(async () => {
  await prisma.user.deleteMany();
  await cleanDB();
>>>>>>> origin/TB-39-refactor-the-backend-to-typescript-Luca:server/src/models/tests/users.test.ts
});

test('should creat new users', async () => {
  const firstUser = await createUser(firstUserInput);
  expect({ ...firstUser, id: firstUserResult.id }).toEqual(firstUserResult);

  const secondUser = await createUser(secondUserInput);
  expect({ ...secondUser, id: secondUserResult.id }).toEqual(secondUserResult);
});

test('should get all users', async () => {
  const users = await getAllUsers();
  expect(users.length).toBe(2);
  expect({ ...users[0], id: firstUserResult.id }).toEqual(firstUserResult);
  expect({ ...users[1], id: secondUserResult.id }).toEqual(secondUserResult);
});

test('should get a single user by google id', async () => {
  const user = await getUser('1302rnou2ü38');
  expect({ ...user, id: secondUserResult.id }).toEqual(secondUserResult);
});

test('should update watchlist of users', async () => {
<<<<<<< HEAD:server/models/tests/users.test.ts
  mockCtx.prisma.user.update.mockResolvedValue({ ...secondUser, watchlist: ['TSLA'] });
  await expect(updateWatchlist('1302rnou2ü38', ['TSLA'], ctx)).resolves.toEqual({
    ...secondUser,
=======
  const user = await getUser('1302rnou2ü38');
  const updatedUser = await updateWatchlist(user.id, ['TSLA']);
  expect({ ...updatedUser, id: secondUserResult.id }).toEqual({
    ...secondUserResult,
>>>>>>> origin/TB-39-refactor-the-backend-to-typescript-Luca:server/src/models/tests/users.test.ts
    watchlist: ['TSLA'],
  });
});

test('should not create users on incorrect input', async () => {
  await expect(createUser(incorrectUserInput)).rejects.toBeInstanceOf(Error);
});
