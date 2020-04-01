CREATE TABLE `spaces` (
  `id` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `gif` VARCHAR(255) NOT NULL,
  `gameid` int (11) NOT NULL,

  PRIMARY KEY ( `id` ) 
);

CREATE TABLE `games` (
  `id` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `boardname` VARCHAR(255) NOT NULL,
  `judgeid` int (11),

  PRIMARY KEY ( `id` ) 
);

CREATE TABLE `players` (
  `id` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `ready` boolean default false,
  `spaceid` int (11) NOT NULL,
  `gameid` int (11) NOT NULL,

  PRIMARY KEY ( `id` ) 
);

CREATE TABLE `captions` (
  `id` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `caption` VARCHAR( 255) NOT NULL,

  PRIMARY KEY ( `id` ) 
);