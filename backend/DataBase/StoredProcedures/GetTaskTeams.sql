DELIMITER $$
SELECT "Creating procedure GetTaskTeams" $$
DROP PROCEDURE IF EXISTS GetTaskTeams $$
CREATE PROCEDURE `GetTaskTeams`(IN taskid INT)
BEGIN
SELECT * FROM teamtasksview tt INNER JOIN teamview t ON tt.Team_idTeam = t.idTeam WHERE tt.Task_idTask = taskid;
END;
$$

DELIMITER ;