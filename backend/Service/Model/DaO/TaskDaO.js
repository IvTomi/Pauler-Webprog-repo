let Task = function (id,taskname,description,taskstatus,deadline){
    this.Id = id
    this.TaskName = taskname
    this.Description = description
    this.Status = taskstatus
    this.DeadLine = deadline
}

let TaskBuilder = function(){
    let id
    let taskname
    let description
    let status
    let deadline

    return{
        setId: function(id){
            this.id = id? id:-1
            return this
        },
        setTaskname: function(taskname){
            this.taskname = taskname? taskname:""
            return this
        },
        setDescription: function(description){
            this.description = description? description:""
            return this
        },
        setStatus: function(status){
            this.status = status? status:null
            return this
        },setDeadline: function(deadline){
            this.deadline = deadline? deadline:null
            return this
        },
        build:function(){
            return new Task(id,taskname,description,status,deadline);
        }
    }
}

function GetTask(id,taskname,description,taskstatus,deadline){
    return new TaskBuilder().setId(id).setTaskname(taskname).setDescription(description).setStatus(taskstatus).setDeadline(deadline);
}
function GetTaskListJson(tasks){
    return {"Tasks":tasks}
}

module.exports={
    TaskBuilder : TaskBuilder,
    GetTask:GetTask,
    GetTaskListJson:GetTaskListJson
}