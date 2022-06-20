/*
  Warnings:

  - You are about to drop the column `userId` on the `Battle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Battle" DROP CONSTRAINT "Battle_userId_fkey";

-- AlterTable
ALTER TABLE "Battle" DROP COLUMN "userId",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "winner" TEXT;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_BattleToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BattleToUser_AB_unique" ON "_BattleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BattleToUser_B_index" ON "_BattleToUser"("B");

-- AddForeignKey
ALTER TABLE "_BattleToUser" ADD CONSTRAINT "_BattleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Battle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleToUser" ADD CONSTRAINT "_BattleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
