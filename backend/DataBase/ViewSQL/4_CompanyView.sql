SELECT "Creating companyview";
DROP VIEW IF EXISTS companyview;
CREATE VIEW `companyview` AS
    SELECT 
        `company`.`idCompany` AS `idCompany`,
        `company`.`CompanyName` AS `CompanyName`
    FROM
        `company`
    WHERE
        (1 = `company`.`Status`)