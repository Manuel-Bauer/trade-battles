import { MockContext, Context, createMockContext } from '../../testing/context';
import { firstUser, secondUser } from '../../testing/mocks';
//@ts-ignore
import { createTransaction, getAllTransactions } from '../transactions.model';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
  // ... creating users etc ...
});

test('should create new transaction', async () => {
  // ...
});
