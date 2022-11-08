require("dotenv").config;
const axios = require('axios');
const cheerio = require('cheerio');

const asyncWrapper = require("../middlewares/async_wrapper");

const getMeals = asyncWrapper(
    async (req, res, next) => {

        try {
            const result = await axios.get(process.env.MEALS);
            const data = result.data;
            const $ = cheerio.load(data);
            const mealAsString = $('.mx-1');
            const meals = [];

            mealAsString.each((idx, el) => {
                const mealJson = {};
                const elements = $(el).children('.card-body').text().trim().split('SALATA-SANDVİÇ BÜFESİ');
                const final = [];
                elements.forEach((value, indx) => {//*body salata-sandvic'ten ayrılmıs olarak geliyor
                    const core = value.split('\t');//* ogunler ve diger cop degerler ayrılmıs olarak geliyor
                    core.forEach((value, indx) => {
                        console.log({ value });

                        if (value.length != 0 && !value.startsWith('Per') && !value.startsWith('Ala') && !value.startsWith('\n')) {
                            final.push(`${value}SALATA-SANDVİÇ BÜFESİ\n`);
                        }
                    });

                    final.forEach((val, indx) => {
                        if (indx == 1) {
                            mealJson.empLaunc = val;
                        } else if (indx == 2) {
                            mealJson.dinner = val;
                        } else {
                            mealJson.stdLaunch = val;
                        }
                    });

                });
                mealJson.date = $(el).children('.card-footer').text().trim();
                meals.push(mealJson);

            });
            //console.log(meals);

            res.status(200).json({ result: meals });
        } catch (error) {
            console.log(error);
        }
    }
);


module.exports = { getMeals }