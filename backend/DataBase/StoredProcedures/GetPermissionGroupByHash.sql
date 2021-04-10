DELIMITER $$
SELECT "Creating procedure GetPermissionGroupByHash" $$
DROP PROCEDURE IF EXISTS GetPermissionGroupByHash $$
CREATE PROCEDURE `GetPermissionGroupByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM permissiongroupview WHERE id=permissiongroupview.PermissionGroup_idPermissionGroup AND hash=permissiongroupview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM permissiongroupview WHERE id=permissiongroupview.PermissionGroup_idPermissionGroup AND hash=permissiongroupview.SuperUser_Hash ;
END IF;
END;
$$