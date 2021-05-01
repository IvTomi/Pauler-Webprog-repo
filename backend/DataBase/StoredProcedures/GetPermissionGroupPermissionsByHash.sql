DELIMITER $$
SELECT "Creating procedure GetPermissionGroupPermissionsByHash" $$
DROP PROCEDURE IF EXISTS GetPermissionGroupPermissionsByHash $$
CREATE PROCEDURE `GetPermissionGroupPermissionsByHash`(IN permissiongroupid INT ,IN permissionid INT, IN hash VARCHAR(60))
BEGIN
SELECT * FROM permissiongrouppermissionsview WHERE permissiongrouppermissionsview.PermissionGroup_idPermissionGroup = permissiongroupid AND permissiongrouppermissionsview.Permission_idPermission=permissionid AND permissiongrouppermissionsview.SuperUser_Hash=hash;
END;
$$

DELIMITER ;