import { MockContext, Context, createMockContext } from '../../testing/context';
import { firstUser, secondUser } from '../../testing/mocks';
//@ts-ignore
import { createBattle, getMyBattles, updateBattle } from '../battles.model';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
  // .. creating users etc ...
});

test('should create new battle', async () => {
  // ...
});
