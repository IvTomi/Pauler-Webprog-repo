DELIMITER $$
SELECT "Creating procedure DeleteTeam" $$
DROP PROCEDURE IF EXISTS DeleteTeam $$
CREATE PROCEDURE `DeleteTeam`(IN teamid INT, in userid INT)
BEGIN
	START TRANSACTION;
		UPDATE team SET Status = 2, LastModifiedBy = userid WHERE team.idTeam = teamid;
        UPDATE task_has_team t SET Status = 2, LastModifiedBy = userid WHERE t.Team_idTeam = teamid;
		UPDATE team_has_user t SET Status = 2, LastModifiedBy = userid WHERE t.Team_idTeam = teamid;
	COMMIT;
END
$$