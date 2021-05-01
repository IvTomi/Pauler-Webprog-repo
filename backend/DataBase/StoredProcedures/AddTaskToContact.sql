DELIMITER $$
SELECT "Creating procedure AddTaskToContact" $$
DROP PROCEDURE IF EXISTS AddTaskToContact $$
CREATE PROCEDURE `AddTaskToContact`(IN taskid INT, IN contactid INT, IN userid INT)
BEGIN
	START TRANSACTION;
		IF NOT EXISTS (SELECT * FROM contact_has_task WHERE Contact_idContact = contactid AND Task_idTask = taskid)THEN
			INSERT INTO contact_has_task (Task_idTask,Contact_idContact,LastModifiedBy) VALUES (taskid,contactid,userid);
        ELSE
			IF NOT EXISTS (SELECT * FROM usercontactsview WHERE Contact_idContact = contactid AND Task_idTask = taskid)THEN
				UPDATE contact_has_task SET Status = 1 WHERE Contact_idContact = contactid AND Task_idTask = taskid;
            ELSE
				SIGNAL SQLSTATE '45000' 
				SET MESSAGE_TEXT = 'Task already added';
            END IF;
        END IF;
	COMMIT;
END;
$$

DELIMITER ;