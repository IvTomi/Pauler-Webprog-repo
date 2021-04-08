SELECT "Creating usertasksview";
DROP VIEW IF EXISTS usertasksview;
CREATE VIEW `usertasksview` AS
    SELECT 
        `taskview`.`idTask` AS `Task_idTask`,
        `taskview`.`TaskName` AS `TaskName`,
        `taskview`.`Description` AS `Description`,
        `taskview`.`Deadline` AS `Deadline`,
        `taskview`.`Status_idStatus` AS `Status_idStatus`,
        `taskview`.`StatusName` AS `StatusName`,
        `taskview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `task_has_user`.`User_idUser` AS `User_idUser`
    FROM
        (`task_has_user`
        JOIN `taskview` ON ((`task_has_user`.`Task_idTask` = `taskview`.`idTask`)))
    WHERE
        (1 = `task_has_user`.`Status`)