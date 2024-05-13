/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DrinkConfigModel1713348467938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'drink_config',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ingredient',
            type: 'int',
          },
          {
            name: 'amount_left',
            type: 'int',
          },

        ],
        foreignKeys: [
          {
            name: 'ingredient',
            referencedTableName: 'ingredients',
            referencedColumnNames: ['id'],
            columnNames: ['ingredient'],
          },

        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('drink_config');
  }
}
