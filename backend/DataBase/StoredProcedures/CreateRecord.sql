DELIMITER $$
SELECT "Creating procedure CreateRecord" $$
DROP PROCEDURE IF EXISTS CreateRecord $$
CREATE PROCEDURE `CreateRecord`(IN date DATE,IN comment TEXT, IN minute TINYINT,IN hour TINYINT,IN userid INT, IN modifierid INT, IN hash VARCHAR(60))
BEGIN
	DECLARE recordId INT;
	START TRANSACTION;
		INSERT INTO record (Date,Comment,Minute,Hour,User_idUser,LastModifiedBy,SuperUser_Hash) VALUES (date,comment,minute,hour,userid,modifierid,hash);
        SET recordId = LAST_INSERT_ID();
	COMMIT;
	SELECT recordId as Id;
END;
$$

DELIMITER ;