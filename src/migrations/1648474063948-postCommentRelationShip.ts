import {MigrationInterface, QueryRunner} from "typeorm";

export class postCommentRelationShip1648474063948 implements MigrationInterface {
    name = 'postCommentRelationShip1648474063948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comment" ADD "postId" integer`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP COLUMN "postId"`);
    }

}
