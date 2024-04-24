import { type } from 'os';
import { MigrationInterface, QueryRunner,Table } from 'typeorm'

export class RecipeModel1713267607597 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'recipes',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'uploaded_by',
                        type: 'int',
                        isNullable: true,
                        default: 1
                    },
                ],
                foreignKeys: [{
                    name: 'uploaded_by',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['uploaded_by']
                }]
            }));
        await queryRunner.createTable(
            new Table({
                name: 'recipe_to_ingredient',
                columns: [{
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'recipe_id',
                    type: 'int',
                    isNullable:true
                },
                {
                    name: 'ingredient_id',
                    type: 'int',
                    isNullable:true
                },
                {
                    name: 'quantity',
                    type: 'int'
                }],
                foreignKeys: [                
                {
                    name: 'recipe_id',
                    referencedTableName: 'recipes',
                    referencedColumnNames: ['id'],
                    columnNames: ['recipe_id']
                },
                {
                    name: 'ingredient_id',
                    referencedTableName: 'ingredients',
                    referencedColumnNames: ['id'],
                    columnNames: ['ingredient_id']
                }] 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('recipe_to_ingredient');
        await queryRunner.dropTable('recipes');
    }

}
