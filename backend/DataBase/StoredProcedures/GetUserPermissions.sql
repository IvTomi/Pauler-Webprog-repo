DELIMITER $$
SELECT "Creating procedure GetUserPermissions" $$
DROP PROCEDURE IF EXISTS GetUserPermissions $$
CREATE PROCEDURE `GetUserPermissions`(IN id INT)
BEGIN
SELECT * FROM permissiongrouppermissionsview pp INNER JOIN userview u ON u.PermissionGroup_idPermissionGroup = pp.PermissionGroup_idPermissionGroup  WHERE id=u.idUser;
END;
$$

DELIMITER ;