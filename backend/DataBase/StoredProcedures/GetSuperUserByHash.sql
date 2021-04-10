DELIMITER $$
SELECT "Creating procedure GetSuperUserByHash" $$
DROP PROCEDURE IF EXISTS GetSuperUserByHash $$
CREATE PROCEDURE `GetSuperUserByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM superuserview WHERE id=superuserview.idSuperUser AND hash=superuserview.Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM superuserview WHERE id=superuserview.idSuperUser AND hash=superuserview.Hash;
END IF;
END;
$$