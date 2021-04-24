import { Migration } from '@mikro-orm/migrations';

export class Migration20210423230056 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "teacher" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" text not null, "first_name" text not null, "last_name" text not null, "bio" text not null, "instrument" text not null, "password" text not null);');

    this.addSql('create table "student" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" text not null, "first_name" text not null, "last_name" text not null, "password" text not null);');
  }

}
