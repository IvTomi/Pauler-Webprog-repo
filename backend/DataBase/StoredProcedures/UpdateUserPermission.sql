DELIMITER $$
SELECT "Creating procedure UpdateUserPermission" $$
DROP PROCEDURE IF EXISTS UpdateUserPermission $$
CREATE PROCEDURE `UpdateUserPermission`(IN iduser INT, IN idpermission INT, IN isEnabled TINYINT,IN idModifier INT)
BEGIN
DECLARE permissiongroupID INT;
START TRANSACTION;
	SELECT user.PermissionGroup_idPermissionGroup INTO permissiongroupID FROM user WHERE user.idUser = iduser;
	UPDATE permission_has_permissiongroup p SET IsEnabled=isEnabled, LastModifiedBy = idModifier WHERE p.PermissionGroup_idPermissionGroup = permissiongroupID AND p.Permission_idPermission=idpermission ;
COMMIT;
END;
$$

DELIMITER ;