'use strict'

const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
    var data = await repository.get();
    try {
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            messege: 'Falha na requisição GET!'
        })
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            messege: 'Falha na requisição GetById'
        })
    }
}


exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(400).send({
                messege: 'Usuario ou senha invalidos!'
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer.id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name,
                id: customer.id,
                roles: customer.roles
            }
        })

    } catch (e) {
        res.status(400).send({
            messege: 'Falha no cadastro!'
        })
    }
}

exports.refreshToken = async (req, res, next) => {
    try {

        const token = req.body.token || req.query.token || req.headers['token'];
        const data = await authService.decodeToken(token);


        const customer = await repository.getById(data.id);


        if (!customer) {
            res.status(404).send({
                messege: 'Cliente não valido!'
            });
            return;
        }

        const newToken = await authService.generateToken({
            id: customer.id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })

        res.status(201).send({
            token: newToken,
            data: {
                email: customer.email,
                name: customer.name
            },
            message: 'Token atualizado'
        })

    } catch (e) {
        res.status(400).send({
            messege: 'Falha no cadastro!'
        })
    }
}


exports.post = async (req, res, next) => {
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        });
        // emailService.send(
        //     req.body.email,
        //     'Bem vindo ao store NodeJS',
        //     global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({
            messege: 'Customer cadastrado com sucesso!'
        })

    } catch (e) {
        res.status(400).send({
            messege: 'Falha no cadastro!'
        })
    }
}

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.body.id, req.body);
        res.status(200).send({
            messege: 'Customer atualizado com sucesso!'
        })
    } catch (e) {
        res.status(400).send({
            messege: 'Falha ao deletar Customer'
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            messege: 'Customer deletado com sucesso!'
        });
    } catch (e) {
        res.status(400).send({
            messege: 'Falha ao deletar customer'
        })
    }
}