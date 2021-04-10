DELIMITER $$
SELECT "Creating procedure GetStatusByHash" $$
DROP PROCEDURE IF EXISTS GetStatusByHash $$
CREATE PROCEDURE `GetStatusByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM statusview WHERE id=statusview.idStatus AND hash=statusview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM statusview WHERE id=statusview.idStatus AND hash=statusview.SuperUser_Hash;
END IF;
END;
$$