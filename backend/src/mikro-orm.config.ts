import { __prod__ } from "./constants";
import { Student } from "./entities/Student";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Teacher } from "./entities/Teacher";

export default {
  migrations: {
    disableForeignKeys: false, //get around superuser problems
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Student, Teacher],
  dbName: "music-chat",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
