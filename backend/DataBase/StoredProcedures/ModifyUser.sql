DELIMITER $$
SELECT "Creating procedure ModifyUser" $$
DROP PROCEDURE IF EXISTS ModifyUser $$
CREATE PROCEDURE ModifyUser (IN targetuserid INT, IN password TINYBLOB, IN firstname VARCHAR(45), IN lastname VARCHAR(90), IN userid INT)
BEGIN
	START TRANSACTION;
		IF(password != "") THEN
		UPDATE user u SET u.Password = password, u.LastModifiedBy = userid WHERE u.idUser = targetuserid;
        ELSE
        UPDATE user u SET u.FirstName = firstname, u.LastName = lastname,u.LastModifiedBy = userid WHERE u.idUser = targetuserid;
        END IF;
	COMMIT;
END;
$$

DELIMITER ;