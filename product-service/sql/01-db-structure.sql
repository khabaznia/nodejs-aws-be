create extension if not exists "uuid-ossp";

create table products
(
    id          uuid primary key default uuid_generate_v4(),
    title       text not null,
    description text,
    image       text,
    price       int
);

create table stocks
(
    product_id uuid,
    count      int,
    foreign key (product_id) references products (id) on delete cascade on update cascade
);


