DELIMITER $$
SELECT "Creating procedure GetTaskByHash" $$
DROP PROCEDURE IF EXISTS GetTaskByHash $$
CREATE PROCEDURE `GetTaskByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM taskview WHERE id=taskview.idTask AND hash=taskview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM taskview WHERE id=taskview.idTask AND hash=taskview.SuperUser_Hash;
END IF;
END;
$$