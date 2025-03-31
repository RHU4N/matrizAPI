const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8081;

const matriz = require('./controllers/matrizController');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Estou aqui'));
app.use('/matriz', matriz);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`)); 
