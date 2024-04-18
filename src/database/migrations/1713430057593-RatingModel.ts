import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class RatingModel1713430057593 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'ratings',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'recipe_id',
						type: 'int',
						isNullable: false
					},
					{
						name: 'user_id',
						type: 'int',
						isNullable: false
					},
					{
						name: 'rating',
						type: 'int',
						isNullable: false,
					},
				],
				foreignKeys: [
					{
						name: 'recipe_id',
						referencedTableName: 'recipes',
						referencedColumnNames: ['id'],
						columnNames: ['recipe_id']
					},
					{
						name: 'user_id',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['user_id']
					},
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
        	await queryRunner.dropTable('ratings');
	}

}
