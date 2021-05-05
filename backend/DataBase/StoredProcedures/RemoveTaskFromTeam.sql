DELIMITER $$
SELECT "Creating procedure RemoveTaskFromTeam" $$
DROP PROCEDURE IF EXISTS RemoveTaskFromTeam $$
CREATE PROCEDURE RemoveTaskFromTeam (IN teamid INT, IN taskid INT, IN userid INT)
BEGIN
	START TRANSACTION;
		UPDATE task_has_team SET Status = 2, LastModifiedBy = userid WHERE Task_idTask = taskid AND Team_idTeam = teamid;
	COMMIT;
END
$$
DELIMITER ;