/*
  Warnings:

  - You are about to drop the `_ElectionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ElectionToUser" DROP CONSTRAINT "_ElectionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ElectionToUser" DROP CONSTRAINT "_ElectionToUser_B_fkey";

-- AlterTable
ALTER TABLE "positions" RENAME CONSTRAINT "Position_pkey" TO "positions_pkey";

-- DropTable
DROP TABLE "_ElectionToUser";

-- CreateTable
CREATE TABLE "_election_users" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_election_users_AB_unique" ON "_election_users"("A", "B");

-- CreateIndex
CREATE INDEX "_election_users_B_index" ON "_election_users"("B");

-- RenameForeignKey
ALTER TABLE "positions" RENAME CONSTRAINT "Position_electionId_fkey" TO "positions_electionId_fkey";

-- AddForeignKey
ALTER TABLE "_election_users" ADD CONSTRAINT "_election_users_A_fkey" FOREIGN KEY ("A") REFERENCES "elections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_election_users" ADD CONSTRAINT "_election_users_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
