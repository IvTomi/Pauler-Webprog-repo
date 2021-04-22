DELIMITER $$
SELECT "Creating procedure RemoveUserFromTeam" $$
DROP PROCEDURE IF EXISTS RemoveUserFromTeam $$
CREATE PROCEDURE RemoveUserFromTeam (IN teamid INT, IN memberid INT, IN userid INT)
BEGIN
	START TRANSACTION;
		UPDATE team_has_user SET Status = 2, LastModifiedBy = userid WHERE User_idUser = memberid AND Team_idTeam = teamid;
	COMMIT;
END
$$
DELIMITER ;