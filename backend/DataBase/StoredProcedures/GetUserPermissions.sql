DELIMITER $$
SELECT "Creating procedure GetUserPermissions" $$
DROP PROCEDURE IF EXISTS GetUserPermissions $$
CREATE PROCEDURE `GetUserPermissions`(IN id INT)
BEGIN
SELECT userview.PermissionGroup_idPermissionGroup FROM userview WHERE id=userview.idUser;
END;
$$

DELIMITER ;