/*
  Warnings:

  - You are about to drop the column `connected` on the `direction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `direction` DROP COLUMN `connected`,
    ADD COLUMN `is_connected` VARCHAR(191) NULL,
    ADD COLUMN `stay_connected` VARCHAR(191) NULL,
    MODIFY `limit_date` DATETIME(3) NULL;
