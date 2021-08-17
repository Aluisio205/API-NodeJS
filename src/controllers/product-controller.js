'use strict'

const repository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            message:"Falha ao processar sua requisição!"
        });

    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            message:"Falha ao processar sua requisição!"
        });

    }
}

exports.getByTags = async (req, res, next) => {
    try {
        var data = await repository.getByTags(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            message:"Falha ao processar sua requisição!"
        });

    }
}

exports.post = async (req, res, next) => {
    try {
        await repository.post(req.body);
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        })
    } catch (e) {
        res.status(400).send({
            message: " Falha ao cadastrar o produto!"
        })

    }

}

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.body.id, req.body);
        res.status(201).send({
            message: 'Produto atualizado com sucesso!'
        })
    } catch (e) {
        res.status(400).send({
            message: 'Falha na Atualuzação do produto!'
        })
    }


}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Produto deletado com sucesso!'
        })
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao deletar o Produto!'
        })
    }
}