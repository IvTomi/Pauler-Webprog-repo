SELECT "Creating permissiongrouppermissionsview";
DROP VIEW IF EXISTS permissiongrouppermissionsview;
CREATE VIEW `permissiongrouppermissionsview` AS
    SELECT 
        `permission_has_permissiongroup`.`IsEnabled` AS `IsEnabled`,
        `permissionview`.`Permission_idPermission` AS `Permission_idPermission`,
        `permissionview`.`PermissionName` AS `PermissionName`,
        `permissiongroupview`.`PermissionGroup_idPermissionGroup` AS `PermissionGroup_idPermissionGroup`,
        `permissiongroupview`.`SuperUser_Hash` AS `SuperUser_Hash`
    FROM
        ((`permission_has_permissiongroup`
        JOIN `permissionview` ON ((`permission_has_permissiongroup`.`Permission_idPermission` = `permissionview`.`Permission_idPermission`)))
        JOIN `permissiongroupview` ON ((`permission_has_permissiongroup`.`PermissionGroup_idPermissionGroup` = `permissiongroupview`.`PermissionGroup_idPermissionGroup`)))
    WHERE
        (1 = `permission_has_permissiongroup`.`Status`)