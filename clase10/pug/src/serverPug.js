const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }))

const productos=[{name:"Calculadora", precio: 8000, urlImg:'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'}];

app.set('view engine', 'pug');//Registra el motor de plantillas.
app.set('views', './clase10/pug/views');//Especifica la carpeta de plantillas.

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor ${error}`));

app.get('/', (req, res)=>{
    res.render('formulario');
})

app.get('/productos', (req, res)=>{

    res.render('listaProductos', {productos});
})

app.post('/productos', (req, res)=>{
    productos.push(req.body);
    res.redirect('/');
});