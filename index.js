const express = require('express');
const bodyParser = require('body-parser');
const venom = require('venom-bot');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

venom.create({
    session: 'session',
    multidevice: false,
}).then((client) => {
    start(client);

}).catch((err) => {
    console.log(err);
})

// function start(client) {
//     app.get('/', (req, res) => {
//         const { number, text } = req.query;

//         client.sendText(number, text).then((message) => {
//             console.log(message);
//             res.send(message);
//         }).catch((err) => {
//             console.log(err);
//         });

//     })
// }
function start(client) {
    app.post('/', (req, res) => {
        const { number, text } = req.body;

        client.sendText(number, text).then((message) => {
            console.log(message);
            res.status(200).json(message);
        }).catch((err) => {
            res.json(err);
        });

    })
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

