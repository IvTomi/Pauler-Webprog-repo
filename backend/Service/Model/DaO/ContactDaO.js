let Contact = function (id,typename,value,description,ispublic){
    this.Id = id
    this.TypeName = typename
    this.Value = value
    this.Description = description
    this.IsPublic = ispublic
}

let ContactBuilder = function(){
    let id
    let typename
    let value
    let description
    let ispublic

    return{
        setId: function(id){
            this.id = id? id:-1
            return this
        },
        setTypename: function(typename){
            this.typename = typename? typename:""
            return this
        },
        setValue: function(value){
            this.value = value? value:""
            return this
        },
        setDescription: function(description){
            this.description = description? description:""
            return this
        },setIspublic: function(ispublic){
            this.ispublic = ispublic? ispublic:false
            return this
        },
        build:function(){
            return new Contact(id,typename,value,description,ispublic);
        }
    }
}

function GetContact(id,typename,value,description,ispublic){
    return new ContactBuilder().setId(id).setTypename(typename).setValue(value).setDescription(description).setIspublic(ispublic)
}

module.exports={
    ContactBuilder : ContactBuilder,
    GetContact:GetContact
}