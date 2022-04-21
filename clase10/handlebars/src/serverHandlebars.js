const express = require('express');
const exphbs = require('express-handlebars')
const { routerProducts } = require('./router/routerProducts');

const app = express();
app.use(express.urlencoded({ extended: true }))

const handlebarsConfig={
    extname: '.handlebars',
    defaultLayout: 'index.handlebars',
    layoutsDir: "./clase10/handlebars/views/layouts",
    partialsDir: __dirname+"./clase10/handlebars/views/partials"

}

app.engine('handlebars', exphbs.engine(handlebarsConfig));

app.set('view engine', 'handlebars');//Registra el motor de plantillas.
app.set('views', './clase10/handlebars/views/partials');//Especifica la carpeta de plantillas.

app.use('/', routerProducts);

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor ${error}`));