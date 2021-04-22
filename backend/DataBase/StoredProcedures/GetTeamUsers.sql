DELIMITER $$
SELECT "Creating procedure GetTeamUsers" $$
DROP PROCEDURE IF EXISTS GetTeamUsers $$
CREATE PROCEDURE `GetTeamUsers`(IN teamid INT)
BEGIN
SELECT * FROM teamusersview t WHERE t.Team_idTeam = teamid;
END;
$$