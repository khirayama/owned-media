module.exports = {
  type: 'sqlite',
  database: './data/database.sqlite',
  synchronize: true,
  logging: true,
  entities: ['src/entity/**/!(*.test.ts)'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
