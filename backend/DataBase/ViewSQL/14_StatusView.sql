SELECT "Creating statusview";
DROP VIEW IF EXISTS statusview;
CREATE VIEW `statusview` AS
    SELECT 
        `status`.`idStatus` AS `idStatus`,
        `status`.`StatusName` AS `StatusName`
    FROM
        `status`
    WHERE
        (1 = `status`.`Status`)