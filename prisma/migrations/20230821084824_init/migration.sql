-- CreateTable
CREATE TABLE `student` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'student',
    `lastname` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `field` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `master` VARCHAR(191) NULL,
    `internMaster` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NULL,
    `presentation_date` DATETIME(3) NULL,
    `presentation_room` VARCHAR(191) NULL,
    `final_decision` VARCHAR(191) NULL,
    `appreciation` VARCHAR(191) NULL,
    `is_school_fees_paid` BOOLEAN NULL,
    `is_credit_enough` BOOLEAN NULL,
    `is_profil_information_complete` BOOLEAN NULL,
    `is_ready_for_presentation` BOOLEAN NULL,
    `is_presentation_finished` BOOLEAN NULL,
    `is_connected` BOOLEAN NULL,
    `stay_connected` BOOLEAN NULL,
    `directionId` VARCHAR(191) NULL,

    UNIQUE INDEX `student_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `direction` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'direction',
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `university_name` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `limit_date` DATETIME(3) NULL,
    `is_connected` BOOLEAN NULL,
    `stay_connected` BOOLEAN NULL,

    UNIQUE INDEX `direction_email_key`(`email`),
    UNIQUE INDEX `direction_university_name_key`(`university_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_directionId_fkey` FOREIGN KEY (`directionId`) REFERENCES `direction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
