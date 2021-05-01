SELECT "Creating teamtasksview";
DROP VIEW IF EXISTS teamtasksview;
CREATE VIEW `teamtasksview` AS
    SELECT 
        `taskview`.`idTask` AS `Task_idTask`,
        `taskview`.`TaskName` AS `TaskName`,
        `taskview`.`Description` AS `Description`,
        `taskview`.`Deadline` AS `Deadline`,
        `taskview`.`Status_idStatus` AS `Status_idStatus`,
        `taskview`.`StatusName` AS `StatusName`,
        `taskview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `task_has_team`.`Team_idTeam` AS `Team_idTeam`
    FROM
        ((`task_has_team`
        JOIN `taskview` ON ((`task_has_team`.`Task_idTask` = `taskview`.`idTask`)))
        JOIN `teamview` ON ((`task_has_team`.`Team_idTeam` = `teamview`.`idTeam`)))
    WHERE
        (1 = `task_has_team`.`Status`)