/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DrinkConfigModel1715255922565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('drink_config', [
      new TableColumn({
        name: 'hopper_num',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: 'serial_number',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('drink_config', 'hopper_num');
    await queryRunner.dropColumn('drink_config', 'serial_number');
  }
}
