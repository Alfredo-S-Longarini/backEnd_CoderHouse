const express = require('express');
const { routerProducts } = require('./router/routerProducts');

const app = express();
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');//Registra el motor de plantillas.
app.set('views', './clase10/ejs/views/pages');//Especifica la carpeta de plantillas.

app.use('/', routerProducts);

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor ${error}`));