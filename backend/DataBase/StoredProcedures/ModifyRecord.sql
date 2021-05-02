DELIMITER $$
SELECT "Creating procedure ModifyRecord" $$
DROP PROCEDURE IF EXISTS ModifyRecord $$
CREATE PROCEDURE `ModifyRecord`(IN recordid INT,IN date DATE,IN comment TEXT, IN minute TINYINT,IN hour TINYINT,IN userid INT,IN taskid INT, IN modifierid INT)
BEGIN
START TRANSACTION;
		UPDATE record r SET r.Date = date, r.Comment = comment, r.Minute = minute, r.Hour = hour, r.User_idUser = userid, r.Task_idTask = taskid, r.LastModifiedBy = modifierid WHERE r.idRecord = recordid;
	COMMIT;
END;
$$

DELIMITER ;