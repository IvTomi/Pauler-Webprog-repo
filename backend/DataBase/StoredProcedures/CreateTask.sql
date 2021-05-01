DELIMITER $$
SELECT "Creating procedure CreateTask" $$
DROP PROCEDURE IF EXISTS CreateTask $$
CREATE PROCEDURE `CreateTask`(IN taskName VARCHAR(45),IN description TEXT, IN deadline DATE, IN userid INT, IN hash VARCHAR(60))
BEGIN
	DECLARE taskId INT;
	START TRANSACTION;
		INSERT INTO task (TaskName,Description,Deadline,LastModifiedBy,SuperUser_Hash) VALUES (taskName,description,deadline,userid,hash);
        SET taskId = LAST_INSERT_ID();
	COMMIT;
	SELECT taskId as Id;
END;
$$

DELIMITER ;