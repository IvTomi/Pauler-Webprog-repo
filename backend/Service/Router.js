const express = require('express');
const router = new express.Router();
const logger = require('./Utility/Logger');
const bodyParser = require('body-parser');
const configurationManager = require('./Utility/ConfigurationManager');
const userrepo = require("./Model/Repository/UserRepository");
const protocol = require('./Utility/Protocol');
const jsonParser = require('./Utility/JSONParser');
const superuserrepo = require("./Model/Repository/SuperUserRepository");
const { registerSuperUser } = require('./Model/Repository/SuperUserRepository');

const nonIdentifyRoutes = configurationManager.nonidentifiedRoutes();

//Middleware logging
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, username,password,hash");
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    next();
});

router.use((req,res,next)=>{
    logger.info('Request from:'+req.ip+' '+req.protocol+' '+req.originalUrl);    
    /*
    userrepo.authenticateUser(req.headers['username'],req.headers['hash'],req.headers['password']).then(result=>{
        logger.debug(result);
        res.json(result)
        //next();
    }).catch((err)=>{
        logger.debug(err);
        res.json(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
    }) */
    next();
});

//Middleware User authentication
router.use((req,res,next)=>{
    if(checkIdentification()){
        
    } 
    next();     
});

router.get("/test",(req,res)=>{
    logger.debug("Yo");
})

//ez is amúgy bodyból
router.get("/register",(req,res)=>{
    registerSuperUser(req.headers['username'],req.headers['password'],req.headers['email'],req.headers['company']).then((result)=>{
        res.json(result);
    })
})

//tesztnek
router.get("/userbyhash",(req,res)=>
{
    userrepo.userByHash(req.body['userid'],req.headers['hash']).then((result)=>
    {
        res.json(result);
    })
})




router.use(bodyParser.json());

function checkIdentification(route){
    return nonIdentifyRoutes.includes(route);
}

module.exports = router;