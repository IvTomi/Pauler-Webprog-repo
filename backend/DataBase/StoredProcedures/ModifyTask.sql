DELIMITER $$
SELECT "Creating procedure ModifyTask" $$
DROP PROCEDURE IF EXISTS ModifyTask $$
CREATE PROCEDURE `ModifyTask`(IN taskid INT,IN taskName VARCHAR(45),IN description TEXT, IN deadline DATE, IN userid INT)
BEGIN
START TRANSACTION;
		UPDATE task t SET t.TaskName = taskName, t.Description = description, t.Deadline = deadline, t.LastModifiedBy = userid WHERE t.idTask = taskid;
	COMMIT;
END;
$$

DELIMITER ;