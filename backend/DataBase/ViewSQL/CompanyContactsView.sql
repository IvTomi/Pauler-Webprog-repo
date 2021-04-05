SELECT "Creating companycontactsview";
DROP VIEW IF EXISTS companycontactsview;
CREATE VIEW `companycontactsview` AS
    SELECT 
        `contactview`.`idContact` AS `Contact_idContact`,
        `contactview`.`Value` AS `Value`,
        `contactview`.`Comment` AS `Comment`,
        `contactview`.`IsPublic` AS `IsPublic`,
        `contactview`.`ContactType_idContactType` AS `ContactType_idContactType`,
        `contactview`.`TypeName` AS `TypeName`,
        `contactview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `contact_has_company`.`Company_idCompany` AS `Company_idCompany`
    FROM
        (`contact_has_company`
        JOIN `contactview` ON ((`contact_has_company`.`Contact_idContact` = `contactview`.`idContact`)))
    WHERE
        (1 = `contact_has_company`.`Status`)