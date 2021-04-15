DELIMITER $$
SELECT "Creating procedure ModifyUser" $$
DROP PROCEDURE IF EXISTS ModifyUser $$
CREATE PROCEDURE ModifyUser (IN password TINYBLOB, IN firstname VARCHAR(45), IN lastname VARCHAR(90), IN userid INT)
BEGIN
	START TRANSACTION;
		IF(password != "") THEN
		UPDATE user SET password = password, LastModifiedBy = userid;
        ELSE
        UPDATE user SET FirstName = firstname, LastName = lastname,LastModifiedBy = userid;
        END IF;
	COMMIT;
END;
$$

DELIMITER ;