const app = require("./src/app");
const databaseConnector = require("./src/config/dbConnector");
const { serverPort } = require("./src/secret");

app.listen(serverPort, async()=>{
    console.log(`server is running at http://localhost:${serverPort}`);
    await databaseConnector();
})