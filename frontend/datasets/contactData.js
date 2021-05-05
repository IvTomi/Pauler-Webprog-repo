class ContactData{
    constructor(id,typename,value,description,ispublic){
        this.id = id?id:0
        this.typename=typename?typename:""
        this.value=value?value:""
        this.description=description?description:""
        this.ispublic=ispublic===null?false:ispublic

        /*this.testData = [
            {name:'Minta Máté',img:'./res/defaultUser.png',roles:['design', 'structure']},
            {name:'Példa Petra',img:'./res/defaultUser.png',roles:['database','morale']},
            {name:'Alap Aladár',img:'./res/defaultUser.png',roles:['marketing']},
            {name:'Lusta Lujza',img:'./res/defaultUser.png'}
        ]*/

    }
}

export default ContactData;