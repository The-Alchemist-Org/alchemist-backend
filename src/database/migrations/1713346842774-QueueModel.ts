import { MigrationInterface, QueryRunner, Table  } from 'typeorm'

export class QueueModel1713346842774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'queues',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'serial_number',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'recipe_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'done_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: null,
                    },
                ],
                foreignKeys: [{
                    name: 'recipe_id',
                    referencedTableName: 'recipes',
                    referencedColumnNames: ['id'],
                    columnNames: ['recipe_id']
                },
                //Should include serial number as a foreign key constraint whenever that is setup
            ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('queues');
    }

}
