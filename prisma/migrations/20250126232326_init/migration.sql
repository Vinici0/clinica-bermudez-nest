-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "name_other_language" VARCHAR(50),
    "description" VARCHAR(200),
    "acronym" VARCHAR(10),
    "display_on_transfer_ticket_screen" BOOLEAN NOT NULL DEFAULT true,
    "display_on_backend_screen" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);
