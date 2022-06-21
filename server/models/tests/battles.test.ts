import { MockContext, Context, createMockContext } from '../../testing/context';
import { firstUser, secondUser } from '../../testing/mocks';
//@ts-ignore
import { createBattle, getMyBattles, updateBattle } from '../battles.model';
//@ts-ignore
import { createUser } from '../users.model';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(async () => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
  mockCtx.prisma.user.create.mockResolvedValue(firstUser);
  await createUser(firstUser, ctx);

  mockCtx.prisma.user.create.mockResolvedValue(secondUser);
  await createUser(secondUser, ctx);
});

test('should create new battle', async () => {
  // ...
});
