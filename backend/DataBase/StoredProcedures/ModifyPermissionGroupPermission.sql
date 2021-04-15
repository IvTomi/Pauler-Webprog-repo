DELIMITER $$
SELECT "Creating procedure ModifyPermissionGroupPermission" $$
DROP PROCEDURE IF EXISTS ModifyPermissionGroupPermission $$
CREATE PROCEDURE ModifyPermissionGroupPermission (IN permissiongroupid INT, IN permissionid INT,IN isenabled TINYINT, IN userid INT)
BEGIN
	START TRANSACTION;
		IF NOT EXISTS(SELECT * FROM permission_has_permissiongroup php WHERE php.Permission_idPermission = permissionid 
        AND php.PermissionGroup_idPermissionGroup = permissiongroupid) THEN
			INSERT INTO permission_has_permissiongroup (Permission_idPermission,PermissionGroup_idPermissionGroup,IsEnabled,LastModifiedBy)
            VALUES (permissionid,permissiongroupid,isenabled,userid);
        ELSE
			UPDATE permission_has_permissiongroup SET IsEnabled = isenabled, LastModifiedBy = userid WHERE Permission_idPermission = permissionid
            AND PermissionGroup_idPermissionGroup = permissiongroupid AND Status = 1;
        END IF;
    COMMIT; 
END;
$$

DELIMITER ;