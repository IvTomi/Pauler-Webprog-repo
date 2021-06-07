DELIMITER $$
SELECT "Creating procedure AddTaskToTeam" $$
DROP PROCEDURE IF EXISTS AddTaskToTeam $$
CREATE PROCEDURE AddTaskToTeam (IN taskid INT, IN teamid INT, IN userid INT)
BEGIN
	DECLARE done INT DEFAULT FALSE;
    DECLARE currentUserId INT;
	DECLARE cur1 CURSOR FOR SELECT tu.User_idUser FROM teamusersview tu WHERE tu.Team_idTeam = teamid;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
	START TRANSACTION;
		OPEN cur1;
        read_loop: LOOP
			FETCH cur1 INTO currentUserId;
            IF done THEN
				LEAVE read_loop;
			END IF;
            IF NOT EXISTS (SELECT 1 FROM usertasksview WHERE usertasksview.Task_idTask = taskid AND usertasksview.User_idUser = currentUserId) THEN
            CALL AddTaskToUser(taskid,currentUserId,userid);
            END IF;
		END LOOP;
        CLOSE cur1;
            
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