const dbConnector = require("../DatabaseConnector"); 
const logger = require('../../Utility/Logger');
const protocol = require('../../Utility/Protocol');
const encryptor = require('../../Utility/Encryptor');
const { encrypt } = require("../../Utility/Encryptor");
const jsonParser = require('../../Utility/JSONParser');
const teamdao = require('../DaO/TeamDaO');
const userrepo = require('./UserRepository');
const UserDaO = require("../DaO/UserDaO");
const pool = dbConnector.ConnectionPool;

async function getCreateTeam(name, description,userid,hash){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL CreateTeam('${name}','${description}','${userid}','${hash}')`).then((result)=>{
                resolve(result[result.length-2][0]);                     
            }).catch((e)=>{              
                reject(e)
            })
            res.release();   
        })
    })
}

async function getTeamMembers(teamid){
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetTeamUsers('${teamid}')`).then((result)=>{
                resolve(result[result.length-2]);                     
            }).catch((e)=>{              
                reject(e)
            })
            res.release();   
        })
    })
}

async function getUserTeams(userid){
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetTeamUsersw('${teamid}')`).then((result)=>{
                resolve(result[result.length-2]);                     
            }).catch((e)=>{              
                reject(e)
            })
            res.release();   
        })
    })
}

async function getAddUserToTeam(memberid, teamid,tags,userid){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL AddUserToTeam('${memberid}','${teamid}','${tags}','${userid}')`).then((result)=>{
                resolve(protocol.status(true));                     
            }).catch((e)=>{
                
                logger.error(e);
                resolve(null)
            })
            res.release();   
        })
    })
}

async function teamByHash(teamid, hash)
{
    return new Promise((resolve, reject)=>
    {
        getTeamByHash(teamid, hash).then((result)=>
        {
            if(result==null)
            {
                resolve(false);
            }
            else
            {
                resolve(true);
            }
        })
    })
}

async function teamMemberByHash(teamid,memberid, hash)
{
    return new Promise((resolve, reject)=>
    {
        getTeamMemberByHash(teamid,memberid, hash).then((result)=>
        {
            if(result==null)
            {
                resolve(false);
            }
            else
            {
                resolve(true);
            }
        })
    })
}

async function getRemoveUserFromTeam(teamid, memberid,userid){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL RemoveUserFromTeam('${teamid}','${memberid}','${userid}')`).then((result)=>{
                resolve(protocol.status(true));                     
            }).catch((e)=>{
                
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            })
            res.release();   
        })
    })
}

async function getTeamByHash(id, hash){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetTeamByHash('${id}','${hash}')`).then((result)=>{
                resolve(result[result.length-2][0]);                     
            }).catch((e)=>{
                
                resolve(null);
            })
            res.release();   
        })
    })
}

async function getTeamTaskByHash(teamid,taskid, hash){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetTeamTasksByHash('${teamid}','${taskid}','${hash}')`).then((result)=>{
                resolve(result[result.length-2][0]);                     
            }).catch((e)=>{
                
                resolve(null);
            })
            res.release();   
        })
    })
}

function teamTaskByHash(teamid,taskid,hash){
    return new Promise((resolve,reject)=>{
        getTeamTaskByHash(teamid, taskid,hash).then((result)=>
        {
            if(result==null)
            {
                resolve(false);
            }
            else
            {
                resolve(true);
            }
        }).catch((e)=>{
            reject(e)
        })
    })
}

async function getTeamMemberByHash(teamid,memberid, hash){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetTeamMemberByHash('${teamid}','${memberid}','${hash}')`).then((result)=>{
                logger.debug(JSON.stringify(result[result.length-2][0]))
                resolve(result[result.length-2][0]);                     
            }).catch((e)=>{
                resolve(null);
            })
            res.release();   
        })
    })
}



//not finished
async function getTeamUsers(id){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetTeamByHash('${id}')`).then((result)=>{
                resolve(result[result.length-2][0]);                     
            }).catch((e)=>{
                
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            })
            res.release();   
        })
    })
}

async function getDeleteTeam(id,userid){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL DeleteTeam('${id}','${userid}')`).then((result)=>{
                resolve(true)                   
            }).catch((e)=>{
                
                reject(e)
            })
            res.release();   
        })
    })
}

async function getModifyTeam(teamid,teamname,description,userid){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL ModifyTeam(${teamid},'${teamname}','${description}',${userid})`).then((result)=>{
                resolve(true);                     
            }).catch((e)=>{
                logger.debug(e)
                resolve(false)
            })
            res.release();   
        })
    })
}

async function getTeams(hash){
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetTeams('${hash}')`).then((result)=>{
                resolve(result[result.length-2]);                     
            }).catch((e)=>{               
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            })
            res.release();   
        })
    })
}

async function CreateNewTeam(userid,hash,name,description,teammembers){
    return new Promise((resolve,reject)=>{
        userrepo.getUserPermission("CanEditTeam",userid).then(result=>{
            if(!result){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }

            if(!name){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                return
            }
            teammembers.forEach(async element=>{
                const a = await userrepo.userByHash(element['Id'],hash)
                if(!a){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
            })
            getCreateTeam(name,description,userid,hash).then((result)=>{
                /*teammembers.forEach(async member=>{
                    await getAddUserToTeam(member['Id'],result['Id'],member['Tags'],userid).catch((e)=>{
                        logger.error(e);
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                        return
                    })*/
                    resolve((jsonParser.combineJSON(protocol.status(true),{"Id":result['Id']})));
                    
            }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                return
            })

        }).catch((e)=>{
            logger.error(e);
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            return
        })            
        
    })
}

async function AddMemberToTeam(userid,hash,teamid,memberid,tags){
    return new Promise((resolve,reject)=>{
        if(!teamid && !memberid){
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
            return
        }
        //check permission
        userrepo.getUserPermission("CanEditTeam",userid).then(result=>{
            if(!result){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check team exist
            teamByHash(teamid,hash).then(res2=>{
                if(!res2){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
                //check user exist
                userrepo.userByHash(memberid,hash).then(res3=>{
                    if(!res3){
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1)))); 
                        return
                    }
                    //check member added
                    teamMemberByHash(teamid,memberid,hash).then(res4=>{
                        logger.debug(res4)
                        if(res4){
                            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(5)))); 
                            return
                        }
                        logger.debug("wait")
                        //add member
                        getAddUserToTeam(memberid,teamid,tags?tags:"",userid).then(res5=>{
                            resolve((protocol.status(true)));
                        }).catch((e)=>{
                            logger.error(e);
                            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                            return
                        })
                    }).catch((e)=>{
                        logger.error(e);
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                        return
                    })
                }).catch((e)=>{
                    logger.error(e);
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                    return
                })
            }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                return
            })
            //check team exists
        }).catch((e)=>{
            logger.error(e);
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
            return     
        })
    })
}

async function RemoveMemberFromTeam(userid,hash,teamid,memberid){
    return new Promise((resolve,reject)=>{
        if(!teamid && !memberid){
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
            return
        }
        //check permission
        userrepo.getUserPermission("CanEditTeam",userid).then(result=>{
            if(!result){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check team exist
            teamByHash(teamid,hash).then(res2=>{
                if(!res2){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
                //check user exist
                userrepo.userByHash(memberid,hash).then(res3=>{
                    if(!res3){
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1)))); 
                        return
                    }
                    //check member added
                    teamMemberByHash(teamid,memberid,hash).then(res4=>{
                        logger.debug(res4)
                        if(!res4){
                            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));      
                            return
                        }
                        //remove member
                        getRemoveUserFromTeam(teamid,memberid,userid).then(res5=>{
                            resolve((protocol.status(true)));
                        }).catch((e)=>{
                            logger.error(e);
                            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                            return
                        })
                    }).catch((e)=>{
                        logger.error(e);
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                        return
                    })
                }).catch((e)=>{
                    logger.error(e);
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                    return
                })
            }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                return
            })
            //check team exists
        }).catch((e)=>{
            logger.error(e);
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
            return     
        })
    })
}

async function getModifyMemberTag(memberid,teamid,tags,userid){
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL ModifyTeamMemberTag('${memberid}','${teamid}','${tags}','${userid}')`).then((result)=>{
                resolve(true);                     
            }).catch((e)=>{               
                resolve(false);
            })
            res.release();   
        })
    })
}

function viewToTeam(viewobj){
    return {"Team":teamdao.GetTeam(viewobj["idTeam"],viewobj["TeamName"],viewobj["Description"],null,null)};
}

async function ListTeams(hash,userid){
    return new Promise((resolve,reject)=>{
        userrepo.getUserPermission('IsAdmin',userid).then(res=>{
            if(!res){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            getTeams(hash).then(async result=>{                            
                resolve((jsonParser.combineJSON(protocol.status(true),teamdao.GetTeamListJson(result.map(element=>viewToTeam(element['Team']))))));
            }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            })
        }).catch((e)=>{
            logger.error(e);
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
        })
        
    })
}

async function ListTeamUsers(hash,userid,teamid){
    return new Promise((resolve,reject)=>{
        if(!teamid){
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(3))));
            return
        }
        teamByHash(teamid,hash).then(res1=>{
            if(!res1){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
            return
            }
            
            userrepo.getUserPermission('IsAdmin',userid).then(async res=>{
                //console.log("uid"+userid)
                let ismember = await teamMemberByHash(teamid,userid,hash);
                if(!res && !ismember){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                    return
                }
                getTeamMembers(teamid).then(async result=>{                            
                    resolve((jsonParser.combineJSON(protocol.status(true),UserDaO.GetUserListJson(result.map(element=>userrepo.ViewToUser(element))))));
                }).catch((e)=>{
                    logger.error(e);
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                })
            }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            })
        }).catch((e)=>{
            logger.error(e);
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
        })       
        
    })
}



async function MoidifyTeam(userid,hash,teamid,teamname,teamdescription){
    return new Promise((resolve,reject)=>{
        userrepo.getUserPermission("CanEditTeam",userid).then(result=>{
            if(!result){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            if(!teamid){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                return
            }
           
            teamByHash(teamid,hash).then(result=>{           
                if(!result){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
                getModifyTeam(teamid,teamname?teamname:result['TeamName'],teamdescription?teamdescription:result['Description'],userid).then(res2=>{
                    resolve((protocol.status(true)));
                    return
                }).catch((e)=>{
                    logger.error(e);
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
                })
            }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                return
            })
        })           
       
    })
}

async function DeleteTeam(userid,hash,teamid){
    return new Promise((resolve,reject)=>{
        if(!teamid){
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
            return
        }
        teamByHash(teamid,hash).then(result=>{
            if(!result){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                return
            }
            userrepo.getUserPermission('CanEditTeam',userid).then(result=>{
                if(!result){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                    return
                }
                getDeleteTeam(teamid,userid).then(result=>{
                    resolve((protocol.status(true)))
                }).catch((e)=>{
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
                })
            }).catch((e)=>{
                logger.error(e)
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                return
            })
        }).catch((e)=>{
            logger.error(e)
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            return
        })
    })
}

async function ModifyTeamMemberTag(userid,hash,memberid,tag,teamid){
    return new Promise((resolve,reject)=>{
        if(memberid && teamid){
            //Permission can edit team
            userrepo.getUserPermission('CanEditTeam',userid).then(result=>{
                if(!result){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                    return
                }
                //Team with id exists
                teamByHash(teamid,hash).then(res=>{
                    if(!res){
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1)))); 
                        return
                    }
                    //check team member exists with id
                    getTeamMemberByHash(teamid,memberid,hash).then(res2=>{
                        if(!res2){
                            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1)))); 
                            return
                        }
                        //modify team member tag
                        getModifyMemberTag(memberid,teamid,tag?tag:res2['Tag'],userid).then(res=>{
                            resolve((protocol.status(true)))
                        }).catch((e)=>{
                            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                            return
                        })
                    }).catch((e)=>{
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                        return
                    })
                }).catch((e)=>{
                    logger.error(e)
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
                })
            }).catch((e)=>{
                logger.error(e)
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                return
            })
        }else{
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
            return
        }
    })
}

module.exports={
    CreateNewTeam:CreateNewTeam,
    ListTeams:ListTeams,
    MoidifyTeam:MoidifyTeam,
    DeleteTeam:DeleteTeam,
    ModifyTeamMemberTag:ModifyTeamMemberTag,
    AddMemberToTeam:AddMemberToTeam,
    RemoveMemberFromTeam:RemoveMemberFromTeam,
    teamByHash:teamByHash,
    teamTaskByHash:teamTaskByHash,
    teamMemberByHash:teamMemberByHash,
    ListTeamUsers:ListTeamUsers
}
