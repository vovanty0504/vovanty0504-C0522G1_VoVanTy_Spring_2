create database if not exists project_spring_2;

use project_spring_2;

create table if not exists computer_type(
	id int primary key auto_increment,
	name varchar(250),
	is_delete bit default 0
);

create table if not exists `status`(
	id int primary key auto_increment,
	name varchar(50),
	is_delete bit default 0
);

create table if not exists promotion(
	id int primary key auto_increment,
	name varchar(250),
	is_delete bit default 0,
	image text,
	start_time varchar(50),
	end_time varchar(50),
	detail text,
	discount int
);

create table if not exists user(
	username varchar(30) primary key,
    password varchar(200),
    is_delete bit default 0
);

create table  if not exists role(
	id int primary key auto_increment,
    name varchar(30),
    is_delete bit default 0
);

create table if not exists user_role(
	username varchar(50),
    role_id int,
    is_delete bit default 0,
    foreign key(username) references user(username),
    foreign key(role_id) references role(id),
    primary key(username, role_id)
);


create table if not exists customer(
	id int primary key auto_increment,
	name varchar(30),
	is_delete bit default 0,
	day_of_birth varchar(30),
	gender int,
	id_card varchar(12),
	email varchar(100),
	address varchar(200),
    image varchar(500),
	phone_number varchar(15),
	username varchar(30) unique,
	customer_type_id int,
	foreign key (username) references user(username)
);

create table if not exists employee(
	id int primary key auto_increment,
	name varchar(50),
	gender int,
	email varchar(100),
	address varchar(200),
	phone_number varchar(15),
	username varchar(30) unique,
	id_card varchar(12),
	day_of_birth varchar(30),
	image varchar(500),
	is_delete bit default 0,
	foreign key (username) references user(username)
);

create table if not exists computer(
id int primary key auto_increment,
is_delete bit default 0,
name varchar(50),
`cpu` varchar(30),
hard_drive varchar(30),
screen varchar(30),
graphics_card varchar(100),
design varchar(30),
image varchar(500),
ram int,
amount int,
price int,
release_time int,
computer_type_id int,
epmloyee_id int,
status_id int,
foreign key(computer_type_id) references computer_type(id),
foreign key(epmloyee_id) references employee(id),
foreign key(status_id) references status(id)
);


create table if not exists booking_computer(
id int primary key auto_increment,
is_delete bit default 0,
status bit default 0,
computer_id int,
customer_id int,
promotion_id int,
foreign key(computer_id) references computer(id),
foreign key(customer_id) references customer(id),
foreign key(promotion_id) references promotion(id)
);




