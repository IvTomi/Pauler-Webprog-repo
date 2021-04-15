DELIMITER $$
SELECT "Creating procedure CreateContact" $$
DROP PROCEDURE IF EXISTS CreateContact $$
CREATE PROCEDURE CreateContact (IN type VARCHAR(45), IN value VARCHAR(100), IN comment TEXT,IN userid INT, IN ispublic TINYINT, IN hash VARCHAR(60))
BEGIN
	DECLARE contactId INT;
    DECLARE typeId INT;
	START TRANSACTION;
		CALL InitializeContactType(type,userid,hash,typeId);
		IF(hash = '') THEN
			BEGIN
				INSERT INTO contact (ContactType_idContactType,Value,Comment,IsPublic,LastModifiedBy) VALUES (typeId,value,comment,ispublic,userid);
			END;
		ELSE
			BEGIN
				INSERT INTO contact (ContactType_idContactType,Value,Comment,IsPublic,LastModifiedBy,SuperUser_Hash) VALUES (typeId,value,comment,ispublic,userid,hash);
			END;
		END IF;
		SET contactId = LAST_INSERT_ID();
	COMMIT;
	SELECT contactId as Id;
END
$$
DELIMITER ;