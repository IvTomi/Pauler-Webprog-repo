SELECT "Creating statusview";
DROP VIEW IF EXISTS statusview;
CREATE VIEW `statusview` AS
    SELECT 
        `status`.`idStatus` AS `idStatus`,
        `status`.`StatusName` AS `StatusName`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`status`
        JOIN `superuser` ON ((`status`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `status`.`Status`)