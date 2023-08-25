/*
  Warnings:

  - Made the column `updated_at` on table `direction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `direction` MODIFY `updated_at` DATETIME(3) NOT NULL,
    MODIFY `limit_date` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `student` MODIFY `is_school_fees_paid` BOOLEAN NULL DEFAULT false,
    MODIFY `is_credit_enough` BOOLEAN NULL DEFAULT false,
    MODIFY `is_profil_information_complete` BOOLEAN NULL DEFAULT false,
    MODIFY `is_ready_for_presentation` BOOLEAN NULL DEFAULT false,
    MODIFY `is_presentation_finished` BOOLEAN NULL DEFAULT false,
    MODIFY `case_closed` BOOLEAN NULL DEFAULT false;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'admin',
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
