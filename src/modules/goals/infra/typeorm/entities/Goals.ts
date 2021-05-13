import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from "uuid";

@Entity("goals")
export class Goals {
  @PrimaryColumn()
  id?: string;

  @Column()
  country?: string;

  @Column()
  flag?: string;

  @Column()
  local?: string;

  @Column()
  meta?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

}