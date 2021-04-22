DELIMITER $$
SELECT "Creating procedure AddUserToTeam" $$
DROP PROCEDURE IF EXISTS AddUserToTeam $$
CREATE PROCEDURE AddUserToTeam (IN memberid INT, IN teamid INT,IN tags VARCHAR(45), IN userid INT)
BEGIN
	START TRANSACTION;
		IF NOT EXISTS (SELECT * FROM team_has_user WHERE Team_idTeam = teamid AND User_idUser = memberid)THEN
			INSERT INTO team_has_user (Team_idTeam,User_idUser,Tag,LastModifiedBy) VALUES (teamid,memberid,tags,userid);
        ELSE
			IF NOT EXISTS (SELECT * FROM teamusersview WHERE Team_idTeam = teamid AND User_idUser = memberid)THEN
				UPDATE team_has_user SET Status = 1, Tag = tags WHERE Team_idTeam = teamid AND User_idUser = memberid;
            ELSE
				SIGNAL SQLSTATE '45000' 
				SET MESSAGE_TEXT = 'User already added';
            END IF;
        END IF;
	COMMIT;
END
$$
DELIMITER ;