class UserData{
    constructor(id,username,firstname,lastname,contacts,permissions){
        this.id = id?id:0
        this.username=username?username:""
        this.firstname=firstname?firstname:""
        this.lastname=lastname?lastname:""
        this.contacts=contacts?contacts:[]
        this.permissions=permissions?permissions:[]
        this.img ='./res/defaultUser.png'

        /*this.testData = [
            {name:'Minta Máté',img:'./res/defaultUser.png',roles:['design', 'structure']},
            {name:'Példa Petra',img:'./res/defaultUser.png',roles:['database','morale']},
            {name:'Alap Aladár',img:'./res/defaultUser.png',roles:['marketing']},
            {name:'Lusta Lujza',img:'./res/defaultUser.png'}
        ]*/

    }

    getContacts(){

    }
}

export default UserData;