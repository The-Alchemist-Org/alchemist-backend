/* eslint-disable class-methods-use-this */
import {
  MigrationInterface, QueryRunner, Table, TableIndex,
} from 'typeorm';

export class UserModel1633352340207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'invitation_confirmed',
            type: 'bool',
            default: false,
          },
          {
            name: 'forgot_password_token',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'forgot_password_token_expiration',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'user_email_index',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'user_email_index');
    await queryRunner.dropTable('users');
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
  }
}
