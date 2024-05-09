/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class DrinkConfigModel1715255922565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE drink_config ADD COLUMN serial_number INTEGER NOT NULL', // TODO
    );
    await queryRunner.query(
      'ALTER TABLE drink_config ADD COLUMN hopper_num INTEGER NOT NULL', // TODO
    );
    await queryRunner.query(
      'CREATE SEQUENCE drink_config_id_seq OWNED BY drink_config.id', // TODO
    );
    await queryRunner.query(
      'ALTER TABLE drink_config ALTER COLUMN id SET DEFAULT nextval(\'drink_config_id_seq\')', // TODO
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE drink_config ALTER COLUMN id DROP DEFAULT', // TODO
    );
    await queryRunner.query(
      'DROP SEQUENCE drink_config_id_seq', // TODO
    );
    await queryRunner.query(
      'ALTER TABLE drink_config ALTER COLUMN id DROP IDENTITY', // TODO
    );
    await queryRunner.query(
      'ALTER TABLE drink_config DROP COLUMN hopper_num', // TODO
    );
    await queryRunner.query(
      'ALTER TABLE drink_config DROP COLUMN serial_number', // TODO
    );
  }
}
