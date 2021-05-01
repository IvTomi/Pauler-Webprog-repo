let Team = function (id,teamname,description,teammembers,teamtasks){
    this.Id = id
    this.TeamName = teamname
    this.Description = description
    this.TeamMembers = teammembers
    this.TeamTasks = teamtasks
}

let TeamBuilder = function(){
    let id
    let teamname
    let description
    let teammembers
    let teamtasks

    return{
        setId: function(id){
            this.id = id? id:-1
            return this
        },
        setTeamname: function(teamname){
            this.teamname = teamname? teamname:""
            return this
        },
        setDescription: function(description){
            this.description = description? description:""
            return this
        },
        setTeammembers: function(teammembers){
            this.teammembers = teammembers? teammembers:[]
            return this
        },setTeamtasks: function(teamtasks){
            this.teamtasks = teamtasks? teamtasks:[]
            return this
        },
        build:function(){
            return new Team(id,teamname,description,teammembers,teamtasks);
        }
    }
}

function GetTeam(id,teamname,description,teammembers,teamtasks){
    return new TeamBuilder().setId(id).setTeamname(teamname).setDescription(description).setTeammembers(teammembers).setTeamtasks(teamtasks)
}
function GetTeamListJson(teams){
    return {"Teams":teams}
}

module.exports={
    TeamBuilder : TeamBuilder,
    GetTeam:GetTeam,
    GetTeamListJson:GetTeamListJson
}