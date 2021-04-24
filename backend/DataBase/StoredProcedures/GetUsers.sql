DELIMITER $$
SELECT "Creating procedure GetUsers" $$
DROP PROCEDURE IF EXISTS GetUsers $$
CREATE PROCEDURE `GetUsers`(IN hash VARCHAR(60))
BEGIN
SELECT * FROM userview WHERE hash=userview.SuperUser_Hash;
END;
$$

DELIMITER ;