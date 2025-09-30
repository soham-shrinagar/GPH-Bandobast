-- CreateTable
CREATE TABLE "Officer" (
    "id" SERIAL NOT NULL,
    "officerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "stationName" TEXT NOT NULL,

    CONSTRAINT "Officer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personnel" (
    "id" SERIAL NOT NULL,
    "personnelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "deployed" BOOLEAN NOT NULL DEFAULT false,
    "currentCords" JSONB,
    "geofenceId" INTEGER,
    "onShift" BOOLEAN NOT NULL DEFAULT false,
    "stationName" TEXT NOT NULL,

    CONSTRAINT "personnel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "geofence" (
    "id" SERIAL NOT NULL,
    "officerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "center_lat" DOUBLE PRECISION,
    "center_long" DOUBLE PRECISION,
    "radius" DOUBLE PRECISION,
    "polygon" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "geofence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Officer_officerId_key" ON "Officer"("officerId");

-- CreateIndex
CREATE UNIQUE INDEX "Officer_phoneNumber_key" ON "Officer"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "personnel_personnelId_key" ON "personnel"("personnelId");

-- CreateIndex
CREATE UNIQUE INDEX "personnel_phoneNumber_key" ON "personnel"("phoneNumber");

-- AddForeignKey
ALTER TABLE "personnel" ADD CONSTRAINT "personnel_geofenceId_fkey" FOREIGN KEY ("geofenceId") REFERENCES "geofence"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "geofence" ADD CONSTRAINT "geofence_officerId_fkey" FOREIGN KEY ("officerId") REFERENCES "Officer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
