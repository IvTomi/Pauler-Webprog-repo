SELECT "Creating notificationview";
DROP VIEW IF EXISTS notificationview;
CREATE VIEW `notificationview` AS
    SELECT 
        `notification`.`idNotification` AS `idNotification`,
        `notification`.`NotificationName` AS `NotificationName`
    FROM
        `notification`
    WHERE
        (1 = `notification`.`Status`)