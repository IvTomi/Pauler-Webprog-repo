DELIMITER $$
SELECT "Creating procedure GetTeamTasksByHash" $$
DROP PROCEDURE IF EXISTS GetTeamTasksByHash $$
CREATE PROCEDURE `GetTeamTasksByHash`(IN teamid INT ,IN taskid INT, IN hash VARCHAR(60))
BEGIN
SELECT * FROM teamtasksview WHERE  teamtasksview.Team_idTeam=teamid AND teamtasksview.Task_idTask = taskid AND teamtasksview.SuperUser_Hash=hash;
END;
$$

DELIMITER ;