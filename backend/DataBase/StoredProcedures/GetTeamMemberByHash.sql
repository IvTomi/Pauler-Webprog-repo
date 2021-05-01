DELIMITER $$
SELECT "Creating procedure GetTeamMemberByHash" $$
DROP PROCEDURE IF EXISTS GetTeamMemberByHash $$
CREATE PROCEDURE GetTeamMemberByHash (IN teamid INT,IN memberid INT, IN hash VARCHAR(60))
BEGIN
	SELECT * FROM teamusersview WHERE User_idUser = memberid AND SuperUser_Hash = hash AND Team_idTeam = teamid;
END
$$
DELIMITER ;