import { Prisma, User } from '@prisma/client';
import { MockContext, Context, createMockContext } from '../context';
//@ts-ignore
import { getAllUsers, createUser, getUser, updateWatchlist } from './users.model';

let mockCtx: MockContext;
let ctx: Context;

describe('User Model Tests', () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  test.only('should create new user ', async () => {
    const user: User = {
      familyName: 'Buz',
      givenName: 'Maxim',
      google_id: 'p93712henp237o',
      photo:
        'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
      email: 'test@tester.com',
      id: 1,
      watchlist: [],
    };
    mockCtx.prisma.user.create.mockResolvedValue(user);

    await expect(createUser(user, ctx)).resolves.toEqual({
      familyName: 'Buz',
      givenName: 'Maxim',
      google_id: 'p93712henp237o',
      photo:
        'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
      email: 'test@tester.com',
      id: 1,
      watchlist: [],
    });
  });
});
