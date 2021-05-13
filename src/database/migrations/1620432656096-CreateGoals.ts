import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGoals1620432656096 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "goals",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "country",
                    type: "varchar"
                },
                {
                    name: "flag",
                    type: "varchar"
                },
                {
                    name: "local",
                    type: "varchar"
                },
                {
                    name: "meta",
                    type: "timestamp"
                },
                {
                    name: "created_at",
                    type: "timestamp", 
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp", 
                    default: "now()"
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("goals");
    }

}
