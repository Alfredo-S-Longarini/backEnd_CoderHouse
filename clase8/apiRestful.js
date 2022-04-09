const express = require('express');
const { routerProductos } = require('./router/routerProductos');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('clase8/public'));


app.use('/api', routerProductos);

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor ${error}`));