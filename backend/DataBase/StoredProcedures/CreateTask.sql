DELIMITER $$
SELECT "Creating procedure CreateTask" $$
DROP PROCEDURE IF EXISTS CreateTask $$
CREATE PROCEDURE `CreateTask`(IN taskName VARCHAR(45),IN description TEXT, IN deadline DATE, IN userid INT, IN hash VARCHAR(60))
BEGIN
	DECLARE taskId INT;
    DECLARE defaultStatusid INT;
	START TRANSACTION;
		SELECT idStatus INTO defaultStatusid FROM Status where StatusName = 'Default' LIMIT 1;
		INSERT INTO task (TaskName,Description,Deadline,LastModifiedBy,SuperUser_Hash,Status_idStatus) VALUES (taskName,description,deadline,userid,hash,defaultStatusid);
        SET taskId = LAST_INSERT_ID();
	COMMIT;
	SELECT taskId as Id;
END;
$$

DELIMITER ;