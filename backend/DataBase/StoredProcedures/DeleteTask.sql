DELIMITER $$
SELECT "Creating procedure DeleteTask" $$
DROP PROCEDURE IF EXISTS DeleteTask $$
CREATE PROCEDURE `DeleteTask`(IN taskid INT, IN userid INT)
BEGIN
	START TRANSACTION;
		UPDATE task SET Status = 2, LastModifiedBy = userid WHERE task.idTask = taskid;
        UPDATE task_has_team t SET Status = 2, LastModifiedBy = userid WHERE t.Task_idTask = taskid;
		UPDATE task_has_user t SET Status = 2, LastModifiedBy = userid WHERE t.Task_idTask = taskid;
        UPDATE contact_has_task t SET Status = 2, LastModifiedBy = userid WHERE t.Task_idTask = taskid;
	COMMIT;
END;
$$

DELIMITER ;