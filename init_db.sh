#!/bin/bash
docker-compose run --rm express npx sequelize-cli db:migrate:undo:all
docker-compose run --rm express npx sequelize-cli db:drop --env development
docker-compose run --rm express npx sequelize-cli db:create --env development
docker-compose run --rm express npx sequelize-cli db:migrate --env development
docker-compose run --rm express npx sequelize-cli db:seed:all
