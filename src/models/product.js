'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: [true, ' O titulo é obrigatorio!'],
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'O slug é obrigatório'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'A descrição é obrigatória']
    },
    price: {
        type: Number,
        required: [true, 'O preço é obrigatório']
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: [true, "As tags são obrigatórias"]
    }],
    image: {
        type: String,
        required: [true, ' O titulo é obrigatorio!'],
        trim: true
    }
});

module.exports = mongoose.model('Product', schema);