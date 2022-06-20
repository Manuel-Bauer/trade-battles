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
