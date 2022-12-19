-- CreateTable
CREATE TABLE "artist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "album" (
    "id" SERIAL NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "song" (
    "id" SERIAL NOT NULL,
    "album_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',

    CONSTRAINT "song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_song" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "song_id" INTEGER NOT NULL,
    "favorite" BOOLEAN NOT NULL,

    CONSTRAINT "favorite_song_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "song" ADD CONSTRAINT "song_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_song" ADD CONSTRAINT "favorite_song_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_song" ADD CONSTRAINT "favorite_song_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
