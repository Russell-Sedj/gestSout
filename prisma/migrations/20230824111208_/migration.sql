/*
  Warnings:

  - You are about to drop the column `is_connected` on the `direction` table. All the data in the column will be lost.
  - You are about to drop the column `stay_connected` on the `direction` table. All the data in the column will be lost.
  - You are about to drop the column `is_connected` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `stay_connected` on the `student` table. All the data in the column will be lost.
  - Made the column `directionId` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `student_directionId_fkey`;

-- AlterTable
ALTER TABLE `direction` DROP COLUMN `is_connected`,
    DROP COLUMN `stay_connected`,
    ADD COLUMN `address` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `is_connected`,
    DROP COLUMN `stay_connected`,
    MODIFY `directionId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_directionId_fkey` FOREIGN KEY (`directionId`) REFERENCES `direction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
