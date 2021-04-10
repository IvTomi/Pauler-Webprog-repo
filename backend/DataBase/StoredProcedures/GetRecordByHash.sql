DELIMITER $$
SELECT "Creating procedure GetRecordByHash" $$
DROP PROCEDURE IF EXISTS GetRecordByHash $$
CREATE PROCEDURE `GetRecordByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM recordview WHERE id=recordview.idRecord AND hash=recordview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM recordview WHERE id=recordview.idRecord AND hash=recordview.SuperUser_Hash;
END IF;
END;
$$