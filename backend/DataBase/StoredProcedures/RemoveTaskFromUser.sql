DELIMITER $$
SELECT "Creating procedure RemoveTaskFromUser" $$
DROP PROCEDURE IF EXISTS RemoveTaskFromUser $$
CREATE PROCEDURE `RemoveTaskFromUser`(IN userid INT, IN taskid INT, IN modifierid INT)
BEGIN
START TRANSACTION;
		UPDATE task_has_user SET Status = 2, LastModifiedBy = modifierid WHERE Task_idTask = taskid AND User_idUser = userid;
	COMMIT;
END;
$$

DELIMITER ;