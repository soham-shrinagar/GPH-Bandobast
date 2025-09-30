/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Officer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Officer_email_key" ON "Officer"("email");
