
var request = require('request');
var cheerio = require('cheerio');
request('https://www.kommersant.ru/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $('.article_subheader').each(function(i, element){
            console.log($(this).text());
        });
    } else {
        console.log(error, response.statusCode);
    }
});