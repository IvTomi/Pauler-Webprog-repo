DELIMITER $$
SELECT "Creating procedure GetTeamTasks" $$
DROP PROCEDURE IF EXISTS GetTeamTasks $$
CREATE PROCEDURE `GetTeamTasks`(IN teamid INT)
BEGIN
SELECT * FROM teamtasksview t WHERE t.Team_idTeam = teamid;
END;
$$