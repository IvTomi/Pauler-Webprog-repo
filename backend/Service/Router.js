const express = require('express');
const router = new express.Router();
const logger = require('./Utility/Logger');
const bodyParser = require('body-parser');


//Middleware logging
router.use((req,res,next)=>{
    logger.info('Request from:'+req.ip+' '+req.protocol+' '+req.originalUrl);     
    next();
});

//Middleware User authentication
router.use((req,res,next)=>{
    if(req.originalUrl !== "/adduser"
    ){
        
    }        
});

router.use(bodyParser.json());

module.exports = router;