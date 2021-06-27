-- collection of commands and queries used

CREATE DATABASE scheduled;

CREATE TABLE teachers(
    teacher_id SERIAL PRIMARY KEY,
    teacher_name varchar(50),
    department varchar(50),
    avatar varchar(255)
);

CREATE TABLE events(
    event_id SERIAL PRIMARY KEY,
    teacher_id INT NOT NULL,
    title varchar(255),
    description varchar(255),
    month INT NOT NULL,
    year INT NOT NULL,
    day INT NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL,
    priority varchar(10)
);