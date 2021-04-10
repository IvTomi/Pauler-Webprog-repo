DELIMITER $$
SELECT "Creating procedure GetUserByHash" $$
DROP PROCEDURE IF EXISTS GetUserByHash $$
CREATE PROCEDURE `GetUserByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM userview WHERE id=userview.idUser AND hash=userview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM userview WHERE id=userview.idUser AND hash=userview.SuperUser_Hash;
END IF;
END;
$$