DELIMITER $$
SELECT "Creating procedure InitializePermissionGroup" $$
DROP PROCEDURE IF EXISTS InitializePermissionGroup $$
CREATE PROCEDURE InitializePermissionGroup (IN permissiongroupid INT, IN allprivileges TINYINT, IN userid INT)
BEGIN
	START TRANSACTION;
		INSERT INTO permission_has_permissiongroup (Permission_idPermission,PermissionGroup_idPermissionGroup,IsEnabled,LastModifiedBy)
        SELECT p.idPermission, permissiongroupid, allprivileges,userid FROM permission p WHERE p.idPermission 
        NOT IN (SELECT php.Permission_idPermission FROM permission_has_permissiongroup php WHERE php.Permission_idPermission = p.idPermission AND 
        php.PermissionGroup_idPermissionGroup = permissiongroupid);
    COMMIT; 
END;
$$

DELIMITER ;