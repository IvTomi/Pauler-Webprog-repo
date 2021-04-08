SELECT "Creating contacttypeview";
DROP VIEW IF EXISTS contacttypeview;
CREATE VIEW `contacttypeview` AS
    SELECT 
        `contacttype`.`idContactType` AS `idContactType`,
        `contacttype`.`TypeName` AS `TypeName`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`contacttype`
        LEFT JOIN `superuser` ON ((`contacttype`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `contacttype`.`Status`)