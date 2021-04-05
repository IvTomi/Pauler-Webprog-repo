SELECT "Creating contactview";
DROP VIEW IF EXISTS contactview;
CREATE VIEW `contactview` AS
    SELECT 
        `contact`.`idContact` AS `idContact`,
        `contact`.`Value` AS `Value`,
        `contact`.`Comment` AS `Comment`,
        `contact`.`IsPublic` AS `IsPublic`,
        `contacttypeview`.`idContactType` AS `ContactType_idContactType`,
        `contacttypeview`.`TypeName` AS `TypeName`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        ((`contact`
        JOIN `superuser` ON ((`contact`.`SuperUser_Hash` = `superuser`.`Hash`)))
        JOIN `contacttypeview` ON ((`contact`.`ContactType_idContactType` = `contacttypeview`.`idContactType`)))
    WHERE
        (1 = `contact`.`Status`)