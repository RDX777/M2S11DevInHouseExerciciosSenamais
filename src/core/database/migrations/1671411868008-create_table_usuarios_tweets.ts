import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUsuariosTweets1671411868008 implements MigrationInterface {
    name = 'createTableUsuariosTweets1671411868008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "senha" character varying(255) NOT NULL, "urlFoto" character varying(255) NOT NULL, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "UQ_09123a64c09426e71457354d875" UNIQUE ("senha"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tweets" ("id" SERIAL NOT NULL, "texto" text NOT NULL, "data" TIMESTAMP NOT NULL DEFAULT now(), "usuarioId" integer, CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD CONSTRAINT "FK_73f11f9cec85ccfc6115a703783" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP CONSTRAINT "FK_73f11f9cec85ccfc6115a703783"`);
        await queryRunner.query(`DROP TABLE "tweets"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
