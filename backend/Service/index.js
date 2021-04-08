const express = require('express');
const router =require('./Router');
const bodyParser = require('body-parser');
const configurationManager = require('./Utility/ConfigurationManager');
const Logger = require('./Utility/Logger');

const app = express();
const port = configurationManager.getConfigByKey('port');

app.use("/",router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const server = app.listen(port,()=>{
    Logger.info(`listening at http://localhost:${port}`);
})

const startGracefulShutdown = ()=>{
    Logger.info(`Shutting down`);
    server.close(()=> {
        Logger.info('Express shut down.');
      });
}


process.on('SIGTERM', startGracefulShutdown);
process.on('SIGINT', startGracefulShutdown);

//database.Authenticate();
