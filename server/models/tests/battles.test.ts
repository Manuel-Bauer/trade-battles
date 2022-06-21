import prisma from '../../testing/client';
import { MockContext, Context, createMockContext } from '../../testing/context';
import { firstBattleInput, firstBattleResult, firstUserInput, secondUserInput } from '../../testing/mocks';
//@ts-ignore
import { createBattle, getMyBattles, updateBattle } from '../battles.model';
//@ts-ignore
import { createUser } from '../users.model';

beforeEach(async () => {
  await createUser(firstUserInput);
  await createUser(secondUserInput);
});

afterEach(async () => {
  await prisma.user.deleteMany();
  await prisma.battle.deleteMany();
  await prisma.transaction.deleteMany();
});

// test('should create new battle', async () => {
//   const battle = await createBattle(firstBattleInput);
//   expect({ ...battle, id: firstBattleResult.id }).toEqual(firstBattleResult);
// });
