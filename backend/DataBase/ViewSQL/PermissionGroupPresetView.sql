SELECT "Creating permissiongrouppresetview";
DROP VIEW IF EXISTS permissiongrouppresetview;
CREATE VIEW `permissiongrouppresetview` AS
    SELECT 
        `permissiongrouppreset`.`idPermissionGroupPreset` AS `idPermissionGroupPreset`,
        `permissiongrouppreset`.`PresetName` AS `PresetName`,
        `permissiongrouppreset`.`PermissionGroup_idPermissionGroup` AS `PermissionGroup_idPermissionGroup`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`permissiongrouppreset`
        JOIN `superuser` ON ((`permissiongrouppreset`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `permissiongrouppreset`.`Status`)