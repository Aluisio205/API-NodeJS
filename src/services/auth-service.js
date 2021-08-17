'use strict'

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });

}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.autorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['token'];

    if (!token) {
        res.status(401).json({
            messege: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    messege: 'Token Invalido'
                });
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.body || req.headers['token'];

    if (!token) {
        res.status(401).json({
            messege: "Token Invalido"
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, encoded) {
            if (error) {
                res.status(401).json({
                    messege: "Token Invalido"
                })
            } else {
                if (encoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        messege: "Restrito aos administradores"
                    })
                }
            }

        }
        )
    }
}