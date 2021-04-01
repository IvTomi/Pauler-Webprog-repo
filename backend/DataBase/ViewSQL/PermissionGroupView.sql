SELECT "Creating permissiongroupview";
DROP VIEW IF EXISTS permissiongroupview;
CREATE VIEW `permissiongroupview` AS
    SELECT 
        `permissiongroup`.`idPermissionGroup` AS `PermissionGroup_idPermissionGroup`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`permissiongroup`
        JOIN `superuser` ON ((`permissiongroup`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `permissiongroup`.`Status`)