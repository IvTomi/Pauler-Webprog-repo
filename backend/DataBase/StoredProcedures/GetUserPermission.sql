DELIMITER $$
SELECT "Creating procedure GetUserPermission" $$
DROP PROCEDURE IF EXISTS GetUserPermission $$
CREATE PROCEDURE `GetUserPermission`(IN permissionname VARCHAR(45), IN userid INT)
BEGIN
	SELECT p.IsEnabled FROM userview u INNER JOIN permissiongrouppermissionsview p ON u.PermissionGroup_idPermissionGroup = p.PermissionGroup_idPermissionGroup
        WHERE u.idUser = userid AND p.PermissionName = permissionname;
END;
$$