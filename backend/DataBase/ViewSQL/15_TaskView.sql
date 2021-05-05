SELECT "Creating taskview";
DROP VIEW IF EXISTS taskview;
CREATE VIEW `taskview` AS
    SELECT 
        `task`.`idTask` AS `idTask`,
        `task`.`TaskName` AS `TaskName`,
        `task`.`Description` AS `Description`,
        DATE_FORMAT(`task`.`Deadline`, '%Y.%m.%d') AS `Deadline`,
        `statusview`.`idStatus` AS `Status_idStatus`,
        `statusview`.`StatusName` AS `StatusName`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        ((`task`
        LEFT JOIN `statusview` ON ((`statusview`.`idStatus` = `task`.`Status_idStatus`)))
        JOIN `superuser` ON ((`task`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `task`.`Status`)