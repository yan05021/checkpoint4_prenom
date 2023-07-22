-- Active: 1686063302207@@127.0.0.1@3306@baby_name_db
CREATE DATABASE IF NOT EXISTS `baby_name_db`;

USE `baby_name_db`;

DROP TABLE IF EXISTS `baby_name_db`.`users`;

CREATE TABLE IF NOT EXISTS `baby_name_db`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `baby_name_db`.`baby_guesses`;

CREATE TABLE IF NOT EXISTS `baby_name_db`.`baby_guesses` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `guessed_name` VARCHAR(100) NOT NULL,
    `gender` VARCHAR(35) NOT NULL,
    `weight` DECIMAL(5, 2) NOT NULL,
    `height` DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `baby_name_db`.`users`(`id`),
    PRIMARY KEY (`id`)
);

INSERT INTO `baby_name_db`.`users` (first_name, last_name, phone_number) VALUES
    ('mogette', 'chat', '0000'),
    ('joli', 'prenom', '0000'),
    ('moutmout', 'mouton', '0000'),
    ('gali', 'gaga', '0000');

INSERT INTO `baby_name_db`.`baby_guesses` (user_id, guessed_name, gender, weight, height) VALUES
    (1, 'Oliver', 'Male', 3.2, 50.5),
    (3, 'Ethan', 'Male', 3.5, 51.2),
    (4, 'Emma', 'Female', 2.9, 49.8);
