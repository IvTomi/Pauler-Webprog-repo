DELIMITER $$
SELECT "Creating procedure GetCompanyByHash" $$
DROP PROCEDURE IF EXISTS GetCompanyByHash $$
CREATE PROCEDURE `GetCompanyByHash`(IN hash VARCHAR(60))
BEGIN
SELECT c.CompanyName FROM companyview c INNER JOIN superuserview s ON
s.Company_idCompany = c.idCompany WHERE s.Hash = hash;
END;
$$