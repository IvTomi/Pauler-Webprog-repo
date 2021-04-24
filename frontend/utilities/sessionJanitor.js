export default function clearSession(){
    keys = ['allTeams','allTeamsRTM','activeTeam','activeTask','activeProfile'];
    for(let key of keys){
        if(sessionStorage.getItem(key)){
            sessionStorage.removeItem(key);
        }
    }
}
