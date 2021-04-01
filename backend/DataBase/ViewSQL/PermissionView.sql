SELECT "Creating permissionview";
DROP VIEW IF EXISTS permissionview;
CREATE VIEW `permissionview` AS
    SELECT 
        `permission`.`idPermission` AS `Permission_idPermission`,
        `permission`.`PermissionName` AS `PermissionName`
    FROM
        `permission`
    WHERE
        (1 = `permission`.`Status`)