const {Router} = require('express');


const routerProducts = Router();

const productos=[{name:"Calculadora", precio: 8000, urlImg:'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'}];

routerProducts.get('/', (req, res)=>{
    res.render('index.ejs');
});

routerProducts.get('/productos', (req, res)=>{
    res.render('listaProductos', {productos});
})

routerProducts.post('/productos', (req, res)=>{
    productos.push(req.body);
    res.redirect('/');
});

exports.routerProducts = routerProducts;