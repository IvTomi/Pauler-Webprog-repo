const encryptor = require("../../Utility/Encryptor")

function UserDaO(id,firstName,lastName,username,password,permissionGroup,hash){
    this.Id = id;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.LastName = lastName;
    this.Username = username;
    this.Password = password;
    this.PermissionGroup = permissionGroup;
    this.Hash = hash;

    function getId(){
        return this.id;
    }
    function getPassWord(){
        return encryptor.Decrypt;
    }
}

module.exports={
    UserDaO : UserDaO
}