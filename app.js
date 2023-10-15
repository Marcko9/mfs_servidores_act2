const express = require('express');
const router = require('./config/router.config');
const app = express();

require ('./config/db.config');

app.use(express.json());

//Middleware global
// app.use((req, res, next) => {
//     console.log("Request received: ", req.method, req.path);
//     next();
// });

app.use(router);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});