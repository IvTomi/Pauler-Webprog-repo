DELIMITER $$
SELECT "Creating procedure GetUserTasks" $$
DROP PROCEDURE IF EXISTS GetUserTasks $$
CREATE PROCEDURE `GetUserTasks`(IN userid INT)
BEGIN
SELECT t.Task_idTask,t.TaskName,t.Description,t.StatusName, t.User_idUser FROM usertasksview u RIGHT JOIN
(SELECT tuw.User_idUser, ttw.Task_idTask ,ttw.TaskName,ttw.Description,ttw.StatusName FROM teamtasksview ttw INNER JOIN teamusersview tuw 
ON ttw.Team_idTeam = tuw.Team_idTeam) AS t ON t.Task_idTask = u.Task_idTask WHERE t.User_idUser=userid;
END
$$

DELIMITER ;