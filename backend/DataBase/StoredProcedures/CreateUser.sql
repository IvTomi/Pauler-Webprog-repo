DELIMITER $$
SELECT "Creating procedure CreateUser" $$
DROP PROCEDURE IF EXISTS CreateUser $$
CREATE PROCEDURE CreateUser (IN username VARCHAR(45), IN password TINYBLOB, IN firstname VARCHAR(45), IN lastname VARCHAR(90), IN hash VARCHAR(60), IN userid INT, IN allprivileges TINYINT)
BEGIN
	DECLARE userId INT;
    DECLARE permissionGroupId INT;
	START TRANSACTION;		
		IF(hash = '') THEN
			BEGIN
				CALL CreatePermissionGroup (hash, userid);
				SET permissionGroupId = LAST_INSERT_ID();
				INSERT INTO user (FirstName,LastName,Username,Password,LastModifiedBy,PermissionGroup_idPermissionGroup) VALUES (firstname,lastname,username,password,userid,permissionGroupId);
			END;
		ELSE
			BEGIN
				IF EXISTS (SELECT * FROM userview u WHERE u.Username = username AND u.SuperUser_Hash = hash) THEN
					SIGNAL SQLSTATE '45000'
						SET MESSAGE_TEXT = 'Username exists';
				END IF;
                CALL CreatePermissionGroup (hash, userid);
				SET permissionGroupId = LAST_INSERT_ID();
				INSERT INTO user (FirstName,LastName,Username,Password,LastModifiedBy,PermissionGroup_idPermissionGroup,SuperUser_Hash)
                VALUES (firstname,lastname,username,password,userid,permissionGroupId,hash);
			END;
		END IF;
		SET userId = LAST_INSERT_ID();
        IF (userid = 0) THEN
        BEGIN
        UPDATE permissiongroup SET LastModifiedBy = userId WHERE permissiongroup.idPermissionGroup = permissionGroupId;
        END;
        END IF;
		CALL InitializePermissionGroup(permissionGroupId,allprivileges,userId);
	COMMIT;
	SELECT userId as Id;
END;
$$

DELIMITER ;