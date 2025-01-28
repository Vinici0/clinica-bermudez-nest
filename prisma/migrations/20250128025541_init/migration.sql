-- CreateEnum
CREATE TYPE "DisplayType" AS ENUM ('TRANSFER_AND_TICKET_SCREEN', 'TICKET_SCREEN', 'TRANSFER_SCREEN');

-- CreateEnum
CREATE TYPE "ShowFor" AS ENUM ('BACKEND_AND_ONLINE', 'BACKEND', 'ONLINE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STAFF', 'DIRECTOR');

-- CreateTable
CREATE TABLE "sub_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "name_other_language" VARCHAR(100),
    "description" VARCHAR(250),
    "acronym" VARCHAR(10),
    "display_type" "DisplayType" NOT NULL DEFAULT 'TRANSFER_AND_TICKET_SCREEN',
    "show_for" "ShowFor" NOT NULL DEFAULT 'BACKEND_AND_ONLINE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_sub_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "name_other_language" VARCHAR(100),
    "description" VARCHAR(250),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "sub_category_id" INTEGER NOT NULL,

    CONSTRAINT "sub_sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "contact" VARCHAR(20),
    "email" VARCHAR(100),
    "username" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "unique_id" VARCHAR(50),
    "role" "UserRole" NOT NULL DEFAULT 'STAFF',
    "show_next_button" BOOLEAN NOT NULL DEFAULT false,
    "enable_desktop_notification" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "counter_id" INTEGER,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories_on_staff" (
    "staff_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_on_staff_pkey" PRIMARY KEY ("staff_id","category_id")
);

-- CreateTable
CREATE TABLE "counters" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "show_checkbox" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "counters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_email_key" ON "staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "staff_username_key" ON "staff"("username");

-- CreateIndex
CREATE UNIQUE INDEX "staff_unique_id_key" ON "staff"("unique_id");

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_sub_categories" ADD CONSTRAINT "sub_sub_categories_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_counter_id_fkey" FOREIGN KEY ("counter_id") REFERENCES "counters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_staff" ADD CONSTRAINT "categories_on_staff_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_staff" ADD CONSTRAINT "categories_on_staff_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
