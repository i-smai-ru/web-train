# web-train
node.jsを使ったweb入門

## 環境構築
```
docker-compose run --rm express npm install
```

```
cp .env.example .env
```

## 起動
```
docker compose up
```
DB初期化(別ターミナル)
```
./init_db.sh
```
## 終了
```
docker compose down
```

## アクセス
web
```
http://localhost:3000/
```
phpMyadmin
```
http://localhost:8080/
```

## expressコンテナに入る
```
docker-compose run --rm express /bin/bash
```

#### モデル作成サンプル
```
docker-compose run --rm express npx sequelize-cli model:generate --name User --attributes name:string,pass:string,mail:string,age:integer
```

#### シーディング作成サンプル
```
docker-compose run --rm express npx sequelize-cli seed:generate --name user
```
