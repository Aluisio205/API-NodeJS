'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    return await Customer.find({});
}

exports.authenticate = async (data) => {
    return await Customer.findOne({
        email: data.email,
        password: data.password
    });
}

exports.getById = async (id) => {
    var data = await Customer.findById(id);
    return data;
}

exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.update = async (id, data) => {
    await Customer.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    })
}

exports.delete = async (id) => {
    await Customer.findByIdAndDelete(id);
}

