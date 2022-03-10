// Update with your config settings.

module.exports = {

  development: {
    client: 'postgres',
    connection: {
      //Para uma primeira inicialização é necessário comentar a linha "host: 'db',"
      //E criar um banco de dados chamado dev
      //E rodar o comando npx knex --env development migrate:latest
      host: 'db',
      database: 'dev',
      user: 'postgres',
      password: '123456',
      //Para uma primeira inicialização é necessário mudar a porta para 3737
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './api/database/migrations',
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgres',
    connection: {
      //Para uma primeira inicialização é necessário comentar a linha "host: 'db',"
      //E criar um banco de dados chamado hml
      //E rodar o comando npx knex --env staging migrate:latest
      host: 'db',
      database: 'hml',
      user: 'postgres',
      password: '123456',
      //Para uma primeira inicialização é necessário mudar a porta para 3737
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './api/database/migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      //Para uma primeira inicialização é necessário comentar a linha "host: 'db',"
      //E criar um banco de dados chamado prd
      //E rodar o comando npx knex --env production migrate:latest
      host: 'db',
      database: 'prd',
      user:     'postgres',
      password: '123456',
      //Para uma primeira inicialização é necessário mudar a porta para 3737
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './api/database/migrations',
      tableName: 'knex_migrations'
    }
  }

};
