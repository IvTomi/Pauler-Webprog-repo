DELIMITER $$
SELECT "Creating procedure GetUserTasksByHash" $$
DROP PROCEDURE IF EXISTS GetUserTasksByHash $$
CREATE PROCEDURE `GetUserTasksByHash`(IN userid INT ,IN taskid INT, IN hash VARCHAR(60))
BEGIN
SELECT * FROM usertasksview WHERE  usertasksview.User_idUser=userid AND usertasksview.Task_idTask = taskid AND usertasksview.SuperUser_Hash=hash;
END;
$$

DELIMITER ;