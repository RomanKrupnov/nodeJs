const express = require('express');
const fs = require('fs');
const Translate = require('./Translater.js')

const app = express();

app.use(express.static(__dirname));
app.use(express.json());
cache={};

function cachedTranslate(req,res,next) {
    if(req.body && req.body.text){
        if(cache[req.body.text] && cache[req.body.text][req.body.sourceLanguageCode+"=>"+req.body.targetLanguageCode]){
            console.log('Translation from cache:',req.body.text);
            res.json(cache[req.body.text][req.body.sourceLanguageCode+"=>"+req.body.targetLanguageCode])
        } else next();
    }else next();
}
app.get('/cache',(req,res) =>{
    res.json(cache);
});
app.post('/translate',cachedTranslate,(req,res) => {
const request = req.body;
console.log('Request yandex api for:',request.text);
    Translate({
        texts: [request.text],
        sourceLanguageCode: request.sourceLanguageCode,
        targetLanguageCode: request.targetLanguageCode
    }).then((yres) => {
        if(!cache[request.text]) {
            cache[request.text] = {}
        }
        cache[request.text][request.sourceLanguageCode+"=>"+request.targetLanguageCode] = yres.data.translations[0];
        res.json(yres.data.translations[0]);
    }) .catch((err) =>{
        console.log(err);
        res.status('400').json({ message: "Error while translation your request."});
    })
})
app.listen(3000, () => console.log('Listening on port 3000'));