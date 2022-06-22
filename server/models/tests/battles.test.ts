import { getFirstBattleUpdate, secondBattleInput, secondBattleResult } from './../../testing/mocks';
import prisma from '../../testing/client';
import { firstBattleInput, firstBattleResult, firstUserInput, secondUserInput } from '../../testing/mocks';
//@ts-ignore
import { createBattle, getMyBattles, updateBattle } from '../battles.model';
//@ts-ignore
import { createUser, getUser } from '../users.model';

beforeAll(async () => {
  await createUser(firstUserInput);
  await createUser(secondUserInput);
});

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.battle.deleteMany();
  await prisma.transaction.deleteMany();
});

test('should create new battle', async () => {
  const firstBattle = await createBattle(firstBattleInput);
  expect({ ...firstBattle, id: firstBattleResult.id }).toEqual(firstBattleResult);

  const secondBattle = await createBattle(secondBattleInput);
  expect({ ...secondBattle, id: secondBattleResult.id }).toEqual(secondBattleResult);
});

test('should get all battles', async () => {
  const user = await getUser(firstUserInput.id);
  const battles = await getMyBattles(user.id);
  expect(battles.length).toBe(2);
  expect({ ...battles[0], id: firstBattleResult.id }).toEqual({ ...firstBattleResult, transaction: [] });
  expect({ ...battles[1], id: secondBattleResult.id }).toEqual({ ...secondBattleResult, transaction: [] });
});

/* NOT IMPLEMENTED YET */
test('should finish battle and save the winner id', async () => {
  const user = await getUser(firstUserInput.id);
  const battles = await getMyBattles(user.id);
  const updatedBattle = await updateBattle(battles[0].id, getFirstBattleUpdate(user.givenName));
});
