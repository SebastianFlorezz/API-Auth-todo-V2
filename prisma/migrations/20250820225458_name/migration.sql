/*
  Warnings:

  - You are about to alter the column `priority` on the `todo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `status` on the `todo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `todo` MODIFY `priority` ENUM('low', 'medium', 'high') NOT NULL,
    MODIFY `status` ENUM('pending', 'completed', 'archived') NOT NULL DEFAULT 'pending';
