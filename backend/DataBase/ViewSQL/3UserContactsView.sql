SELECT "Creating usercontactsview";
DROP VIEW IF EXISTS usercontactsview;
CREATE VIEW `usercontactsview` AS
    SELECT 
        `contactview`.`idContact` AS `Contact_idContact`,
        `contactview`.`Value` AS `Value`,
        `contactview`.`Comment` AS `Comment`,
        `contactview`.`IsPublic` AS `IsPublic`,
		`contactview`.`ContactType_idContactType` AS `ContactType_idContactType`,
        `contactview`.`TypeName` AS `TypeName`,
        `contactview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `contact_has_user`.`User_idUser` AS `User_idUser`
    FROM
        (`contact_has_user`
        JOIN `contactview` ON ((`contact_has_user`.`Contact_idContact` = `contactview`.`idContact`)))
    WHERE
        (1 = `contact_has_user`.`Status`)