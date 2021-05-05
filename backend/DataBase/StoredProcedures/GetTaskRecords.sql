DELIMITER $$
SELECT "Creating procedure GetTaskRecords" $$
DROP PROCEDURE IF EXISTS GetTaskRecords $$
CREATE PROCEDURE `GetTaskRecords`(IN taskid INT, in recordid INT)
BEGIN
SELECT * FROM recordview r WHERE Task_idTask=taskid;
END;
$$

DELIMITER ;