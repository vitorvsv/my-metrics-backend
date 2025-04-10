drop schema if exists mymetrics cascade;

create schema mymetrics;

create table mymetrics.account (
	account_id uuid primary key,
	name text not null,
	username text not null,
	email text not null,
	password text not null,
	iv text not null,
	tag bytea not null
);

create table mymetrics.targets (
	target_id uuid primary key,
	description text not null,
	start_date date not null,
	end_date date not null,
	value float not null,
	status text,
	frequency text not null,
	account_id uuid not null
);