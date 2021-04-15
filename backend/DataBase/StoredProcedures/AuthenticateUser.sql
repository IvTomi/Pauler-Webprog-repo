DELIMITER $$
SELECT "Creating procedure AuthenticateUser" $$
DROP PROCEDURE IF EXISTS AuthenticateUser $$
CREATE PROCEDURE AuthenticateUser (IN username VARCHAR(45), IN hash VARCHAR(60))
BEGIN
	DECLARE pwd TINYBLOB;
    DECLARE userid INT;
	START TRANSACTION;
		IF EXISTS (SELECT * FROM userview w WHERE w.UserName = username AND w.Password = password AND w.SuperUser_Hash = hash) THEN
			SELECT w.idUser,w.Password INTO  userid,pwd FROM userview w WHERE w.UserName = username AND w.SuperUser_Hash = hash;
        ELSE
        SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Invalid credentials';
        END IF;
	COMMIT;
	SELECT userid as Id,TO_BASE64(pwd) as Cypher;
END;
$$

DELIMITER ;