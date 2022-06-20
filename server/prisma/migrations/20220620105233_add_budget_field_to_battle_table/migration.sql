/*
  Warnings:

  - You are about to drop the `_BattleToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `budget` to the `Battle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BattleToUser" DROP CONSTRAINT "_BattleToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BattleToUser" DROP CONSTRAINT "_BattleToUser_B_fkey";

-- AlterTable
ALTER TABLE "Battle" ADD COLUMN     "budget" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_BattleToUser";
