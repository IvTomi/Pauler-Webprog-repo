DELIMITER $$
SELECT "Creating procedure GetTeams" $$
DROP PROCEDURE IF EXISTS GetTeams $$
CREATE PROCEDURE `GetTeams`(IN hash VARCHAR(60))
BEGIN
SELECT * FROM teamview WHERE hash=teamview.SuperUser_Hash;
END;
$$

DELIMITER ;