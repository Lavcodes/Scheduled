-- collection of commands and queries used

CREATE DATABASE scheduled;

CREATE TABLE teachers(
    teacher_id SERIAL PRIMARY KEY,
    teacher_name varchar(50),
    department varchar(50),
);

CREATE TABLE events(
    event_id SERIAL PRIMARY KEY,
    teacher_id INT NOT NULL,
    month INT NOT NULL,
    year INT NOT NULL,
    day INT NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);