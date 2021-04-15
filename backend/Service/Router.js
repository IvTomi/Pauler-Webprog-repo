const express = require('express');
const router = new express.Router();
const logger = require('./Utility/Logger');
const bodyParser = require('body-parser');
const configurationManager = require('./Utility/ConfigurationManager');
const userrepo = require("./Model/Repository/UserRepository")
const protocol = require('./Utility/Protocol');
const jsonParser = require('./Utility/JSONParser');

const nonIdentifyRoutes = configurationManager.nonidentifiedRoutes();

//Middleware logging
router.use((req,res,next)=>{
    logger.info('Request from:'+req.ip+' '+req.protocol+' '+req.originalUrl);    
    userrepo.authenticateUser(req.headers['username'],req.headers['hash'],req.headers['password']).then(result=>{
        logger.debug(result);
        res.json(result)
        //next();
    }).catch((err)=>{
        logger.debug(err);
        res.json(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
    }) 
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

router.use(bodyParser.json());

function checkIdentification(route){
    return nonIdentifyRoutes.includes(route);
}

module.exports = router;