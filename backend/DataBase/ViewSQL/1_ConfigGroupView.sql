SELECT "Creating configgroupview";
DROP VIEW IF EXISTS configgroupview;
CREATE VIEW `configgroupview` AS
    SELECT 
        `configgroup`.`idConfigGroup` AS `ConfigGroup_idConfigGroup`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`configgroup`
        JOIN `superuser` ON ((`configgroup`.`idConfigGroup` = `superuser`.`ConfigGroup_idConfigGroup`)))
    WHERE
        (1 = `configgroup`.`Status`)