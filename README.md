## O Povo Requer - API
# Primeira inicialização

* Instalar Docker, Docker Compose, NodeJS e pgAdmin

* Dentro da pasta do projeto rodar o comando "docker-compose up"

* No pgAdmin criar um servidor "opovorequer" host:localhot user:postgres password:123456 porta:3737

* Criar um database dev (hml e prd opcionais)

* No arquivo knexfile.js na raiz do projeto comentar as linhas "host: 'db'," (11 para dev) nas config de development, staging e production

* No arquivo knexfile.js na raiz do projeto alterar a port para 3737 (linha 16 para dev) nas config de development, staging e production

* No terminal rodar o comando "npx knex --env development migrate:latest" para dev (staging e production para os outros)

* Descomentar a linha 11 para dev e alterar a porta (linha 16) para 5432. Repetir para staging e prodution caso necessario.

# Pós ambiente

* Iniciar containers "docker-compose up"
  
* Desenvolver e testar

# Criar nova tabela ou alterar tabela no BD

* No arquivo knexfile.js na raiz do projeto comentar as linhas "host: 'db'," (11 para dev) nas config de development, staging e production

* No arquivo knexfile.js na raiz do projeto alterar a port para 3737 (linha 16 para dev) nas config de development, staging e production

* o terminal rodar o comando "npx knex --env development migrate:latest" para dev (staging e production para os outros)

* Descomentar a linha 11 para dev e alterar a porta (linha 16) para 5432. Repetir para staging e prodution caso necessario.

* Por último rodar os testes "npm test"

# Mundo Sombrio (possíveis erros)

* Se ao criar uma nova tabela ou editar uma existente e rodas o latest do knex, as alterações não aparecerem no BD, é recomendado excluir o BD inteiro e refazer o processo de migrations.

* Se feito todo o passo a passo e na hora de rodar as migrations do knex der erro do tipo "banco inexistente", certifique-se que não possue o postgres rodando na máquina, se tiver, desabilite durante o processo de uso da API.
