DELIMITER $$
SELECT "Creating procedure AddTaskToTeam" $$
DROP PROCEDURE IF EXISTS AddTaskToTeam $$
CREATE PROCEDURE AddTaskToTeam (IN taskid INT, IN teamid INT, IN userid INT)
BEGIN
	START TRANSACTION;
		IF NOT EXISTS (SELECT * FROM task_has_team WHERE Team_idTeam = teamid AND Task_idTask = taskid)THEN
			INSERT INTO task_has_team (Team_idTeam,Task_idTask,LastModifiedBy) VALUES (teamid,taskid,userid);
        ELSE
			IF NOT EXISTS (SELECT * FROM teamtasksview WHERE Team_idTeam = teamid AND Task_idTask = taskid)THEN
				UPDATE task_has_team SET Status = 1 WHERE Team_idTeam = teamid AND Task_idTask = taskid;
            ELSE
				SIGNAL SQLSTATE '45000' 
				SET MESSAGE_TEXT = 'Task already added';
            END IF;
        END IF;
	COMMIT;
END
$$
DELIMITER ;