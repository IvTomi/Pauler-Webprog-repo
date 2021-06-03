DELIMITER $$
SELECT "Creating procedure GetUserTeams" $$
DROP PROCEDURE IF EXISTS GetUserTeams $$
CREATE PROCEDURE `GetUserTeams`(IN userid INT)
BEGIN
SELECT DISTINCT tu.Team_idTeam, t.TeamName, t.Description FROM teamusersview tu INNER JOIN teamview t ON t.idTeam = tu.Team_idTeam WHERE tu.User_idUser = userid;
END
$$

DELIMITER ;