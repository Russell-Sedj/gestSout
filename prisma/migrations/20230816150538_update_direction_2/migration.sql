/*
  Warnings:

  - A unique constraint covering the columns `[university_name]` on the table `direction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `telephone` to the `direction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university_name` to the `direction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `direction` ADD COLUMN `telephone` VARCHAR(191) NOT NULL,
    ADD COLUMN `university_name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `direction_university_name_key` ON `direction`(`university_name`);
