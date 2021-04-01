SELECT "Creating companyview";
DROP VIEW IF EXISTS companyview;
CREATE VIEW `companyview` AS
    SELECT 
        `company`.`idCompany` AS `idCompany`,
        `company`.`CompanyName` AS `CompanyName`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`company`
        JOIN `superuser` ON ((`company`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `company`.`Status`)