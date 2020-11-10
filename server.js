const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static(__dirname+'/public'));
app.use(express.json());

// app.get('/', (req, res) => res.send('Hello, Vasya!'));

// app.get('/about', (req, res) => res.send('Nothing new about us...'));

const goodsRouter = express.Router();

goodsRouter.get('/:id', (req, res) => {
// app.get('/api/v1/goods/:id/', (req, res) => {
    fs.readFile('./public/catalogData.json', (err, data) => {
        if (!err) {
            let good;
            try {
                const goods = JSON.parse(data);
                console.log(req.params.id, goods);
                good = goods.find((good) => good.id_product == req.params.id)
                console.log(good);
            } catch (e) {
                res.status(500).json({ error: 'error parsing datafile'});
            }

            if (good) {
                res.json(good);
            } else {
                res.status(404).json('no such good with id '+req.params.id)
            }
        } else {
            res.status(500).json({ error: 'no data file!'});
        }
    })
});

goodsRouter.post('/', (req, res) => {
    console.log(req.body);
    const newGood = req.body;
    fs.readFile('./public/catalogData.json', (err, data) => {
        const goods = JSON.parse(data);

        if (goods.find((good) => good.id_product == newGood.id_product)) {
            res.status("400").json({ error: "already have good with id "+newGood.id_product });
        } else {
            goods.push(newGood);
            fs.writeFileSync('./public/catalogData.json', JSON.stringify(goods, null, '\t'));
            res.json({ result: "added good ok", id: newGood.id_product });
        }
    });
})

app.use('/api/v1/goods', goodsRouter);

app.listen(3000, () => console.log('Listening on port 3000'));