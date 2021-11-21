import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const pgConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12357713a5',
  database: 'dater-db',
  autoLoadEntities: true,
  synchronize: true,
  // migrationsRun: true,
  entities: ['dist/entities/**/*{.js,.ts}'],
  migrations: ['dist/migrations/**/*{.js,.ts}'],
  subscribers: ['dist/subscribers/**/*{.js,.ts}'],
  dropSchema: false,
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/**/entities',
  },
};

// TODO decide this shit
// remove commit before migration
// module.exports = pgConfig;
