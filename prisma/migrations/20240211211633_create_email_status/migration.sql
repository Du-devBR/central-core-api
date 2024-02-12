-- CreateEnum
CREATE TYPE "EmailCheck" AS ENUM ('CKECKED', 'UNCHECKED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_status" "EmailCheck" NOT NULL DEFAULT 'UNCHECKED';
