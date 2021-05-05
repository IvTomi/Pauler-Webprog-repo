
let User = function (id,username,firstname,lastname,contacts,tasks,permissions){
    this.Id = id
    this.Username = username
    this.FirstName = firstname
    this.LastName = lastname
    this.Contacts = contacts
    this.Tasks = tasks
    this.Permissions = permissions
}

let UserBuilder = function(){
    let id
    let username
    let firstname
    let lastname
    let contacts
    let tasks
    let permissions

    return{
        setId: function(id){
            this.id = id? id:-1
            return this
        },
        setUsername: function(username){
            this.username = username? username:""
            return this
        },
        setFirstname: function(firstname){
            this.firstname = firstname? firstname:""
            return this
        },
        setLastname: function(lastname){
            this.lastname = lastname? lastname:""
            return this
        },setContacts: function(contacts){
            this.contacts = contacts? contacts:[]
            return this
        },setTasks: function(tasks){
            this.tasks = tasks? tasks:[]
            return this
        },
        setPermissions: function(permissions){
            this.permissions = permissions? permissions:[]
            return this
        },
        build:function(){
            return new User(id,username,firstname,lastname,contacts,tasks,permissions);
        }
    }
}

function GetUser(id,username,firstname,lastname,contacts,tasks,permissions){
    return new UserBuilder().setId(id).setUsername(username).setFirstname(firstname).setLastname(lastname).setContacts(contacts).setTasks(tasks).setPermissions(permissions);
}

function GetUserListJson(users){
    return {"Users":users}
}

module.exports={
    UserBuilder : UserBuilder,
    GetUser:GetUser,
    GetUserListJson:GetUserListJson
}