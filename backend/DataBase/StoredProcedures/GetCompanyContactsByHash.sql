DELIMITER $$
SELECT "Creating procedure GetCompanyContactsByHash" $$
DROP PROCEDURE IF EXISTS GetCompanyContactsByHash $$
CREATE PROCEDURE `GetCompanyContactsByHash`(IN companyid INT ,IN contactid INT, IN hash VARCHAR(60))
BEGIN
SELECT * FROM companycontactsview WHERE companycontactsview.Company_idCompany = companyid AND companycontactsview.Contact_idContact=contactid AND companycontactsview.SuperUser_Hash=hash;
END;
$$

DELIMITER ;