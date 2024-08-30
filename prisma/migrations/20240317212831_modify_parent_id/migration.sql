-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_parent_id_fkey";

-- AlterTable
ALTER TABLE "answers" ALTER COLUMN "parent_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
