FROM mysql:latest

COPY serveur_mysql/setup_telegraph_db.sql /docker-entrypoint-initdb.d/1_setup_telegraph_db.sql