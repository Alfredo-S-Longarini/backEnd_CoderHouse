const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require ('socket.io');

const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('clase12/public'));

const productos=[{nombre:"Calculadora", precio: 8000, img:'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png' }];
const mensajes =[];

io.on('connection', (socket)=>{

    socket.emit('productos', productos);
    socket.emit('mensajes', mensajes);

    socket.on('nuevoProducto', data =>{
        productos.push(data);
        io.sockets.emit('productos', productos);
    });

    socket.on('nuevoMsj', data =>{
        data.fecha = new Date().toLocaleString();
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
    });
})

const server = httpServer.listen(8080, ()=>{
    console.log(`Servidor conectado. Puerto: ${server.address().port}`);
})
server.on('error', error => console.log((`Error en servidor ${error}`)));