'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    return await Product.find({
        active: true
    });
}

exports.getById = async (id) => {
    return Product.findById(id);
}

exports.getBySlug = async (slug) => {
    return Product.findOne({
        slug : slug,
        active : true
    })
}

exports.getByTags = async (tags) => {
    return Product.find({
        tags : tags,
        active : true
    })
}

exports.post = async (data) => {
    var product = new Product(data)
    await product.save();
}

exports.update = async (id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            slug: data.slug,
            description: data.description,
            price: data.price,
            tags: data.tags
        }
    });
}

exports.delete = async (id) => {
    await Product.findByIdAndDelete(id);
}