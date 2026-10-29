#!/bin/sh
set -eu
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<SQL
SELECT 'CREATE DATABASE __DB___test'
WHERE NOT EXISTS (
  SELECT FROM pg_database WHERE datname = '__DB___test'
)\gexec
SQL
