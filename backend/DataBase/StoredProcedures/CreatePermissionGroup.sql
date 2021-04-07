DELIMITER $$
SELECT "Creating procedure CreatePermissionGroup" $$
DROP PROCEDURE IF EXISTS CreatePermissionGroup $$
CREATE PROCEDURE CreatePermissionGroup (in hash VARCHAR(60), IN userid INT)
BEGIN
    DECLARE permissionGroupId INT;
	START TRANSACTION;
		IF (hash != '')THEN
			INSERT INTO permissiongroup (LastModifiedBy,SuperUser_Hash) VALUES (userid,hash);
        ELSE
			INSERT INTO permissiongroup (LastModifiedBy) VALUES (userid);
        END IF;
        SET permissionGroupId = LAST_INSERT_ID();
	COMMIT;
	SELECT permissionGroupId as Id;
END;
$$