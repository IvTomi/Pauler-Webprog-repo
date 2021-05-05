DELIMITER $$
SELECT "Creating procedure GetTaskUsers" $$
DROP PROCEDURE IF EXISTS GetTaskUsers $$
CREATE PROCEDURE `GetTaskUsers`(IN taskid INT)
BEGIN
SELECT * FROM usertasksview INNER JOIN userview ON usertasksview.User_idUser = userview.idUser WHERE usertasksview.Task_idTask=taskid;
END;
$$

DELIMITER ;