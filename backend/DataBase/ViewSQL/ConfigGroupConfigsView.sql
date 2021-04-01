SELECT "Creating configgroupconfigsview";
DROP VIEW IF EXISTS configgroupconfigsview;
CREATE VIEW `configgroupconfigsview` AS
    SELECT 
        `configgroup_has_config`.`ConfigValue` AS `ConfigValue`,
        `configgroupview`.`ConfigGroup_idConfigGroup` AS `ConfigGroup_idConfigGroup`,
        `configgroupview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `configview`.`Config_idConfig` AS `Config_idConfig`,
        `configview`.`ConfigKey` AS `ConfigKey`
    FROM
        ((`configgroup_has_config`
        JOIN `configview` ON ((`configgroup_has_config`.`Config_idConfig` = `configview`.`Config_idConfig`)))
        JOIN `configgroupview` ON ((`configgroup_has_config`.`ConfigGroup_idConfigGroup` = `configgroupview`.`ConfigGroup_idConfigGroup`)))
    WHERE
        (1 = `configgroup_has_config`.`Status`)