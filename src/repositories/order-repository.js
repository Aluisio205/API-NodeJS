'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async (req, res, next) => {
    return await Order.find({}, 'number status')
        .populate('customer', 'name')
        .populate('items.product', 'title');
}

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
}

exports.update = async (id, data) => {
    await Order.findByIdAndUpdate(id, {
        $set: {
            customer: data.customer,
            status: data.status,
            items: data.items
        }
    })
}

exports.delete = async (id) => {
    await Order.findByIdAndDelete(id);
}