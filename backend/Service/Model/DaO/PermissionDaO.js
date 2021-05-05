let Permission = function (id,permissionname,isenabled){
    this.Id = id
    this.PermissionName = permissionname
    this.IsEnabled = isenabled
}

let PermissionBuilder = function(){
    let id
    let permissionname
    let isenabled

    return{
        setId: function(id){
            this.id = id? id:-1
            return this
        },
        setPermissionname: function(permissionname){
            this.permissionname = permissionname? permissionname:""
            return this
        },
        setIsenabled: function(isenabled){
            this.isenabled = isenabled? isenabled:false
            return this
        },
        build:function(){
            return new Permission(id,permissionname,isenabled);
        }
    }
}

function GetPermission(id,permissionname,isenabled){
    return new PermissionBuilder().setId(id).setPermissionname(permissionname).setIsenabled(isenabled)
}

function GetPermissionListJson(permissions){
    return {"Permissions":permissions}
}

module.exports={
    PermissionBuilder : PermissionBuilder,
    GetPermission:GetPermission,
    GetPermissionListJson:GetPermissionListJson
}