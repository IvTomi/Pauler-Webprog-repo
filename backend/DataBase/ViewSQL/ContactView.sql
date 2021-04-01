SELECT "Creating contactview";
DROP VIEW IF EXISTS contactview;
CREATE VIEW `contactview` AS
    SELECT 
        `contact`.`idContact` AS `idContact`,
        `contact`.`TypeName` AS `TypeName`,
        `contact`.`Value` AS `Value`,
        `contact`.`Comment` AS `Comment`,
        `contact`.`IsPublic` AS `IsPublic`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`contact`
        JOIN `superuser` ON ((`contact`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `contact`.`Status`)