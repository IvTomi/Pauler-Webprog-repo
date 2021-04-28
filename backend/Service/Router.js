const express = require('express');
const router = new express.Router();
const logger = require('./Utility/Logger');
const bodyParser = require('body-parser');
const configurationManager = require('./Utility/ConfigurationManager');
const userrepo = require("./Model/Repository/UserRepository");
const protocol = require('./Utility/Protocol');
const jsonParser = require('./Utility/JSONParser');
const superuserrepo = require("./Model/Repository/SuperUserRepository");
const recordrepo = require("./Model/Repository/RecordRepository");
const { registerSuperUser } = require('./Model/Repository/SuperUserRepository');

const nonIdentifyRoutes = configurationManager.nonidentifiedRoutes();

router.use(bodyParser.json());

//Middleware logging
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, username,password,hash");
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    next();
});

router.use((req,res,next)=>{
    logger.info('Request from:'+req.ip+' '+req.protocol+' '+req.originalUrl);
    //getnonidentifiedroutes tömbböt átnéz ha benne akkor végrehajt (nem reg, log)
    if(nonIdentifyRoutes.includes(req.originalUrl))
    {
        next();
    }
    else
    {
        userrepo.authenticateUser(req.headers['username'],req.headers['hash'],req.headers['password']).then(result=>{
            logger.debug(result);
            if(result['Status']=='Success')
            {
                req.userid = result['Userid'];
                next();
            }
            else
            {
                res.json(result);
            }
        }).catch((err)=>{
            logger.debug(err);
            res.json(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
        })
    }
    
});

router.get("/test",(req,res)=>
{
    logger.debug("Yo");
})

//ez is amúgy bodyból
router.get("/register",(req,res)=>{
    registerSuperUser(req.headers['username'],req.headers['password'],req.headers['email'],req.headers['company']).then((result)=>{
        res.json(result);
    })
})

function checkIdentification(route){
    return nonIdentifyRoutes.includes(route);
}

module.exports = router;