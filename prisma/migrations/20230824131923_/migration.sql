/*
  Warnings:

  - You are about to drop the column `case_close` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `student` DROP COLUMN `case_close`,
    ADD COLUMN `case_closed` BOOLEAN NULL;
