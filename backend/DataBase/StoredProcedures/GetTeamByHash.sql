DELIMITER $$
SELECT "Creating procedure GetTeamByHash" $$
DROP PROCEDURE IF EXISTS GetTeamByHash $$
CREATE PROCEDURE `GetTeamByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM teamview WHERE id=teamview.idTeam AND hash=teamview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM teamview WHERE id=teamview.idTeam AND hash=teamview.SuperUser_Hash;
END IF;
END;
$$