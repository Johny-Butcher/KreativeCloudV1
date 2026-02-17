-- 1. Grant Privileges
GRANT ALL PRIVILEGES ON *.* TO 'ftp_admin'@'%';

GRANT SUPER ON *.* TO 'ftp_admin'@'%';

FLUSH PRIVILEGES;

-- 2. Use the correct database
USE cloud_platform;

-- 3. Create Table (Comma removed after directory)
CREATE TABLE IF NOT EXISTS `User` (
    `username` varchar(128) NOT NULL,
    `password` varchar(64) NOT NULL,
    `directory` varchar(128) NOT NULL,
    PRIMARY KEY (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;