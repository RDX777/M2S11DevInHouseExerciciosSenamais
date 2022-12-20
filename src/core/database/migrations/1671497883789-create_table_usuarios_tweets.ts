import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUsuariosTweets1671497883789 implements MigrationInterface {
    name = 'createTableUsuariosTweets1671497883789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "salt" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_09123a64c09426e71457354d875"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_09123a64c09426e71457354d875" UNIQUE ("senha")`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "salt"`);
    }

}
