SELECT "Creating configview";
DROP VIEW IF EXISTS configview;
CREATE VIEW `configview` AS
    SELECT 
        `config`.`idConfig` AS `Config_idConfig`,
        `config`.`ConfigKey` AS `ConfigKey`,
        `config`.`DefaultValue` AS `DefaultValue`
    FROM
        `config`
    WHERE
        (1 = `config`.`Status`)