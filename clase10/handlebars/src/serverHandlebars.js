const express = require('express');
const exphbs = require('express-handlebars')

const app = express();
app.use(express.urlencoded({ extended: true }))

const productos=[{name:"Calculadora", precio: 8000, urlImg:'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'}];

let listExist=false;

const handlebarsConfig={
    extname: '.handlebars',
    defaultLayout: 'index.handlebars',
    layoutsDir: "./clase10/handlebars/views/layouts",
    partialsDir: __dirname+"./clase10/handlebars/views/partials"

}

app.engine('handlebars', exphbs.engine(handlebarsConfig));

app.set('view engine', 'handlebars');//Registra el motor de plantillas.
app.set('views', './clase10/handlebars/views/partials');//Especifica la carpeta de plantillas.

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor ${error}`));

app.get('/', (req, res)=>{
    res.render('formulario.handlebars');
})

app.get('/productos', (req, res)=>{

    if(productos.length>0){
        listExist=true;
    }else{
        listExist=false
    }

    res.render('listaProductos.handlebars', {productos, listExist});
})

app.post('/productos', (req, res)=>{
    productos.push(req.body);
    console.log(req.body);
    res.redirect('/');
});