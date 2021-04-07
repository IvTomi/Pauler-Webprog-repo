SELECT "Creating notificationview";
DROP VIEW IF EXISTS notificationview;
CREATE VIEW `notificationview` AS
    SELECT 
        `notification`.`idNotification` AS `idNotification`,
        `notification`.`NotificationName` AS `NotificationName`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`notification`
        JOIN `superuser` ON ((`notification`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `notification`.`Status`)