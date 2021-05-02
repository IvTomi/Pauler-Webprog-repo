DELIMITER $$
SELECT "Creating procedure GetTaskRecords" $$
DROP PROCEDURE IF EXISTS GetTaskRecords $$
CREATE PROCEDURE `GetTaskRecords`(IN taskid INT, in recordid INT)
BEGIN
SELECT * FROM recordview r WHERE r.idRecord = recordid AND Task_idTask=taskid;
END;
$$

DELIMITER ;