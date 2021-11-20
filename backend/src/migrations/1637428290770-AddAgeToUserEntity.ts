import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAgeToUserEntity1637428290770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`ALTER TABLE user_entity ADD age INTEGER`);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropColumn('user_entity', 'age');
  }
}
