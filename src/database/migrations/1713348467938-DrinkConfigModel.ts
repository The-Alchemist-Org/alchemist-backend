import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
						generationStrategy: 'increment'
					},
					{
						name: 'dispenser_1_ingredient',
						type: 'int'
					},
					{
						name: 'dispenser_2_ingredient',
						type: 'int'
					},
					{
						name: 'dispenser_3_ingredient',
						type: 'int'
					},
					{
						name: 'dispenser_4_ingredient',
						type: 'int'
					},
					{
						name: 'dispenser_5_ingredient',
						type: 'int'
					},
					{
						name: 'dispenser_1_amount_left',
						type: 'int'
					},
					{
						name: 'dispenser_2_amount_left',
						type: 'int'
					},
					{
						name: 'dispenser_3_amount_left',
						type: 'int'
					},
					{
						name: 'dispenser_4_amount_left',
						type: 'int'
					},
					{
						name: 'dispenser_5_amount_left',
						type: 'int'
					}

				],
				foreignKeys: [
					{
						name: 'dispenser_1_ingredient',
						referencedTableName: 'ingredients',
						referencedColumnNames: ['id'],
						columnNames: ['dispenser_1_ingredient']
					},
					{
						name: 'dispenser_2_ingredient',
						referencedTableName: 'ingredients',
						referencedColumnNames: ['id'],
						columnNames: ['dispenser_2_ingredient']
					},
					{
						name: 'dispenser_3_ingredient',
						referencedTableName: 'ingredients',
						referencedColumnNames: ['id'],
						columnNames: ['dispenser_3_ingredient']
					},
					{
						name: 'dispenser_4_ingredient',
						referencedTableName: 'ingredients',
						referencedColumnNames: ['id'],
						columnNames: ['dispenser_4_ingredient']
					},
					{
						name: 'dispenser_5_ingredient',
						referencedTableName: 'ingredients',
						referencedColumnNames: ['id'],
						columnNames: ['dispenser_5_ingredient']
					}
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
        	await queryRunner.dropTable('drink_config');
	}

}
