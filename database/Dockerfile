FROM library/postgres

ADD init.sql /docker-entrypoint-initdb.d/
COPY ./init.sql /docker-entrypoint-initdb.d/
