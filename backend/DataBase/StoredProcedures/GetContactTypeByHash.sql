DELIMITER $$
SELECT "Creating procedure GetContactTypeByHash" $$
DROP PROCEDURE IF EXISTS GetContactTypeByHash $$
CREATE PROCEDURE `GetContactTypeByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM contacttypeview WHERE id=contacttypeview.idContactType AND hash=contacttypeview.SuperUser_Hash ) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM contacttypeview WHERE id=contacttypeview.idContactType AND hash=contacttypeview.SuperUser_Hash;
END IF;
END;
$$