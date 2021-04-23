DELIMITER $$
SELECT "Creating procedure ModifyTeam" $$
DROP PROCEDURE IF EXISTS ModifyTeam $$
CREATE PROCEDURE ModifyTeam (IN teamid INT,IN teamname VARCHAR(45),IN description TINYTEXT, IN userid INT)
BEGIN
	START TRANSACTION;
		UPDATE team t SET t.TeamName = teamname,t.Description = description, t.LastModifiedBy = userid WHERE t.idTeam = teamid;
	COMMIT;
END;
$$

DELIMITER ;