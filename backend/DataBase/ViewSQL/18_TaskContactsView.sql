SELECT "Creating taskcontactsview";
DROP VIEW IF EXISTS taskcontactsview;
CREATE VIEW `taskcontactsview` AS
    SELECT 
        `contactview`.`idContact` AS `Contact_idContact`,
        `contactview`.`Value` AS `Value`,
        `contactview`.`Comment` AS `Comment`,
        `contactview`.`IsPublic` AS `IsPublic`,
        `contactview`.`ContactType_idContactType` AS `ContactType_idContactType`,
        `contactview`.`TypeName` AS `TypeName`,
        `contactview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `contact_has_task`.`Task_idTask` AS `Task_idTask`
    FROM
        ((`contact_has_task`
        JOIN `contactview` ON ((`contact_has_task`.`Contact_idContact` = `contactview`.`idContact`)))
        JOIN `taskview` ON ((`contact_has_task`.`Task_idTask` = `taskview`.`idTask`)))
    WHERE
        (1 = `contact_has_task`.`Status`)