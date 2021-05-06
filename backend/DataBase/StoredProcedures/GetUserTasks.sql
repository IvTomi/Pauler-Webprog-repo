DELIMITER $$
SELECT "Creating procedure GetUserTasks" $$
DROP PROCEDURE IF EXISTS GetUserTasks $$
CREATE PROCEDURE `GetUserTasks`(IN userid INT)
BEGIN
SELECT DISTINCT t.Task_idTask,t.TaskName,t.Description,t.StatusName, t.User_idUser FROM usertasksview u CROSS JOIN
(SELECT tuw.User_idUser, ttw.Task_idTask ,ttw.TaskName,ttw.Description,ttw.StatusName FROM teamtasksview ttw INNER JOIN teamusersview tuw 
ON ttw.Team_idTeam = tuw.Team_idTeam) AS t WHERE t.User_idUser=userid;
END
$$

DELIMITER ;