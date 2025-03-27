drop schema if exists mymetrics cascade;

create schema mymetrics;

create table mymetrics.account (
	account_id uuid primary key,
	name text not null,
	username text not null,
	email text not null,
	password text not null
);
