DELIMITER $$
SELECT "Creating procedure GetCompanyByHash" $$
DROP PROCEDURE IF EXISTS GetCompanyByHash $$
CREATE PROCEDURE `GetCompanyByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM companyview WHERE id=companyview.idCompany AND hash=companyview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM companyview WHERE id=companyview.idCompany AND hash=companyview.SuperUser_Hash;
END IF;
END;
$$