DELIMITER $$
SELECT "Creating procedure GetPermissionGroupPresetByHash" $$
DROP PROCEDURE IF EXISTS GetPermissionGroupPresetByHash $$
CREATE PROCEDURE `GetPermissionGroupPresetByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM permissiongrouppresetview WHERE id=permissiongrouppresetview.idPermissionGroupPreset AND hash=permissiongrouppresetview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM permissiongrouppresetview WHERE id=permissiongrouppresetview.idPermissionGroupPreset AND hash=permissiongrouppresetview.SuperUser_Hash;
END IF;
END;
$$