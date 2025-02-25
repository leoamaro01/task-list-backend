import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Task {
  @PrimaryKey()
  id!: number;

  @Property({ type: "text" })
  text!: string;

  @Property()
  checked: boolean = false;
}
