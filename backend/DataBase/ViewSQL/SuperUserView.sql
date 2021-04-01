SELECT "Creating superuserview";
DROP VIEW IF EXISTS superuserview;
CREATE VIEW `superuserview` AS
    SELECT 
        `superuser`.`idSuperUser` AS `idSuperUser`,
        `superuser`.`Hash` AS `Hash`,
        `superuser`.`IsEmailConfirmed` AS `IsEmailConfirmed`,
        `superuser`.`ConfirmationCode` AS `ConfirmationCode`,
        `userview`.`idUser` AS `User_idUser`,
        `companyview`.`idCompany` AS `Company_idCompany`,
        `companyview`.`CompanyName` AS `CompanyName`,
        `contactview`.`idContact` AS `Contact_idContact`,
        `contactview`.`TypeName` AS `TypeName`,
        `contactview`.`Value` AS `Value`,
        `contactview`.`Comment` AS `Comment`
    FROM
        (((`superuser`
        LEFT JOIN `userview` ON ((`userview`.`idUser` = `superuser`.`User_idUser`)))
        LEFT JOIN `companyview` ON ((`companyview`.`idCompany` = `superuser`.`Company_idCompany`)))
        LEFT JOIN `contactview` ON ((`contactview`.`idContact` = `superuser`.`Contact_idContact`)))
    WHERE
        (1 = `superuser`.`Status`)