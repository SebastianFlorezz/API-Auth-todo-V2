/*
  Warnings:

  - You are about to drop the column `complete` on the `todo` table. All the data in the column will be lost.
  - Added the required column `priority` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todo` DROP COLUMN `complete`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `due_date` DATETIME(3) NULL,
    ADD COLUMN `priority` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
