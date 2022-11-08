require("dotenv").config();
const express = require('express');
const app = express();
const router = require('./router/scrapper_router');
const notFound = require('./middlewares/not_found');
const errorHandlerMiddleware = require('./middlewares/error_handler_middleware');

//* json middleware
app.use(express.json());

app.use('/api/v1/ytu-meals/', router);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`app is working on ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();