/*
  Warnings:

  - Added the required column `likes` to the `answers` table without a default value. This is not possible if the table is not empty.
  - The required column `parent_id` was added to the `answers` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `likes` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saved` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shared` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "likes" INTEGER NOT NULL,
ADD COLUMN     "parent_id" TEXT NOT NULL,
ALTER COLUMN "modified_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "likes" INTEGER NOT NULL,
ADD COLUMN     "saved" INTEGER NOT NULL,
ADD COLUMN     "shared" INTEGER NOT NULL,
ALTER COLUMN "modified_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "modified_at" DROP NOT NULL;

-- CreateTable
CREATE TABLE "technologies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "technologies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersTechnologies" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "technologie_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usersTechnologies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favoritesQuestions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favoritesQuestions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersTechnologies" ADD CONSTRAINT "usersTechnologies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersTechnologies" ADD CONSTRAINT "usersTechnologies_technologie_id_fkey" FOREIGN KEY ("technologie_id") REFERENCES "technologies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritesQuestions" ADD CONSTRAINT "favoritesQuestions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritesQuestions" ADD CONSTRAINT "favoritesQuestions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
