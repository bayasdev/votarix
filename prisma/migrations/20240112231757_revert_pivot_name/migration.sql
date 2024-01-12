/*
  Warnings:

  - You are about to drop the `_election_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_election_users" DROP CONSTRAINT "_election_users_A_fkey";

-- DropForeignKey
ALTER TABLE "_election_users" DROP CONSTRAINT "_election_users_B_fkey";

-- DropTable
DROP TABLE "_election_users";

-- CreateTable
CREATE TABLE "_ElectionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ElectionToUser_AB_unique" ON "_ElectionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ElectionToUser_B_index" ON "_ElectionToUser"("B");

-- AddForeignKey
ALTER TABLE "_ElectionToUser" ADD CONSTRAINT "_ElectionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "elections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElectionToUser" ADD CONSTRAINT "_ElectionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
