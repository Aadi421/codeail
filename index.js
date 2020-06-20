const express = require('express');
const port = 8000;
const app = express();







app.listen(port, (err) => {
    if (err) {
        console.log(`error in starting server:${err}`);
    }
    console.log(`server is up and running at port:${port}`);

});