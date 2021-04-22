DELIMITER $$
SELECT "Creating procedure CreateTeam" $$
DROP PROCEDURE IF EXISTS CreateTeam $$
CREATE PROCEDURE CreateTeam (IN name VARCHAR(45), IN description TINYTEXT,IN userid INT, IN hash VARCHAR(60))
BEGIN
	DECLARE teamId INT;
	START TRANSACTION;
		INSERT INTO team (TeamName,Description,SuperUser_Hash,LastModifiedBy) VALUES (name,description,hash,userid);
        SET teamId = LAST_INSERT_ID();
	COMMIT;
	SELECT teamId as Id;
END
$$
DELIMITER ;