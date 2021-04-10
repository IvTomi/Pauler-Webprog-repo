DELIMITER $$
SELECT "Creating procedure GetContactByHash" $$
DROP PROCEDURE IF EXISTS GetContactByHash $$
CREATE PROCEDURE `GetContactByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM contactview WHERE id=contactview.idContact AND hash=contactview.SuperUser_Hash ) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM contactview WHERE id=contactview.idContact AND hash=contactview.SuperUser_Hash;
END IF;
END;
$$