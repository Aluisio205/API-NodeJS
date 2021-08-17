'use strict'

const app = require('../src/app');
const debug = require('debug');
const http = require('http');

const port = normalizePort(process.env.port || '3000');  // Atribuindo a porta 3000 a constante port
app.set('port', port);                                  // Atribuindo a porta do servidor a constante port

const server = http.createServer(app); //Criando o servidor e atribundo a constante server

server.listen(port); // Faz com que o servidor receba requisiçoes na porta definida, sem ela não tem como receber requisição
server.on('error', onError); // Adiciona ao servidor a funcao de tratativa de erros onError
server.on('listening', onListening);


function normalizePort(val) {           // Função para atribuir uma porta disponivel
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error) {               // Função para tratativa de erros
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACESS':
            console.error(bind + ' requer privilegios elevados');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' já está em uso');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'Pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on' + bind);
}