DELIMITER $$
SELECT "Creating procedure AddTaskToUser" $$
DROP PROCEDURE IF EXISTS AddTaskToUser $$
CREATE PROCEDURE `AddTaskToUser`(IN taskid INT, IN userid INT, IN modifierid INT)
BEGIN
	START TRANSACTION;
		IF NOT EXISTS (SELECT * FROM task_has_user WHERE User_idUser = userid AND Task_idTask = taskid)THEN
			INSERT INTO task_has_user (Task_idTask,User_idUser,LastModifiedBy) VALUES (taskid,userid,modifierid);
        ELSE
			IF NOT EXISTS (SELECT * FROM usertasksview WHERE User_idUser = userid AND Task_idTask = taskid)THEN
				UPDATE task_has_user SET Status = 1 WHERE User_idUser = userid AND Task_idTask = taskid;
            ELSE
				SIGNAL SQLSTATE '45000' 
				SET MESSAGE_TEXT = 'Task already added';
            END IF;
        END IF;
	COMMIT;
END;
$$

DELIMITER ;