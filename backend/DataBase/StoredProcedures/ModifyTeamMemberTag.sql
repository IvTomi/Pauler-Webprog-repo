DELIMITER $$
SELECT "Creating procedure ModifyTeamMemberTag" $$
DROP PROCEDURE IF EXISTS ModifyTeamMemberTag $$
CREATE PROCEDURE ModifyTeamMemberTag (IN memberid INT, IN teamid INT, IN tags VARCHAR(45),IN userid INT)
BEGIN
	START TRANSACTION;
		UPDATE team_has_user t SET t.Tag = tags, t.LastModifiedBy = userid WHERE t.Team_idTeam = teamid AND t.User_idUser = memberid;
	COMMIT;
END
$$
DELIMITER ;