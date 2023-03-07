CREATE DATABASE bank;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS account_levels (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  max_balance NUMERIC(10,2) NOT NULL,
  benefits VARCHAR[],
  price_per_month NUMERIC(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS clients (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  password VARCHAR NOT NULL,
  owner_id UUID,
  FOREIGN KEY(owner_id) REFERENCES clients(id),
  balance NUMERIC(10,2) NOT NULL,
  account_level_id UUID,
  FOREIGN KEY(account_level_id) REFERENCES account_levels(id)
);