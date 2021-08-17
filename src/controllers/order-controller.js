'use strict'

const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            messege: 'Falha na requisição'
        })
    }
}

exports.post = async (req, res, next) => {
    try {
        //Recupera o Token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //Decodifica o token
        const data = await authService.decodeToken(token);


        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({
            messege: 'Ordem cadastrada com sucesso'
        });
    } catch (e) {
        res.status(400).send({
            messege: 'Falha no cadastro da ordem'
        })
    }
}

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.body.id, req.body);
        res.status(201).send({
            messege: "Ordem atualizada com sucesso"
        })
    } catch (e) {
        res.status(400).send({
            messege: 'Falha na atualização da ordem'
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            messege: "Ordem deletada com sucesso"
        })
    } catch (e) {
        res.status(400).send({
            messege: 'Falha ao tentar deletar a ordem'
        })
    }
}