'use strict'

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const config = require('./config')
const app = express();
const router = express.Router();

//Conexão ao banco de dados
mongoose.connect(config.connectionString);

//Carrega as Models
const Product = require('../src/models/product');
const Order = require('../src/models/order');
const Customer = require('../src/models/customer');

//Carrega as rotas
const indexRouter = require('../src/routers/index-router');
const productRouter = require('../src/routers/product-router');
const orderRouter = require('../src/routers/order-router');
const customerRouter = require('../src/routers/customer-router');


app.use(bodyParser.json({
    limit:'5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));


// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/customers', customerRouter);

module.exports = app;
