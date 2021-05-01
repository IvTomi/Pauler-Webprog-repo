DELIMITER $$
SELECT "Creating procedure UpdateUserPermission" $$
DROP PROCEDURE IF EXISTS UpdateUserPermission $$
CREATE PROCEDURE `UpdateUserPermission`(IN iduser INT, IN permissionName VARCHAR(45), IN isEnabled TINYINT,IN idModifier INT)
BEGIN
DECLARE permissiongroupID INT;
DECLARE idpermission INT;
START TRANSACTION;
	SELECT user.PermissionGroup_idPermissionGroup INTO permissiongroupID FROM user WHERE user.idUser = iduser;
    SELECT permissionview.Permission_idPermission INTO idpermission FROM permissionview WHERE permissionview.PermissionName = permissionName;
	UPDATE permission_has_permissiongroup p SET IsEnabled=isEnabled, LastModifiedBy = idModifier WHERE p.PermissionGroup_idPermissionGroup = permissiongroupID AND p.Permission_idPermission=idpermission ;
COMMIT;
END;
$$

DELIMITER ;