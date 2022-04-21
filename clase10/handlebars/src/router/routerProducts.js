const {Router} = require('express');


const routerProducts = Router();

const productos=[{name:"Calculadora", precio: 8000, urlImg:'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'}];

let listExist=false;

routerProducts.get('/', (req, res)=>{
    res.render('formulario.handlebars');
});

routerProducts.get('/productos', (req, res)=>{
    if(productos.length>0){
        listExist=true;
    }else{
        listExist=false
    }

    res.render('listaProductos.handlebars', {productos, listExist})
})

routerProducts.post('/productos', (req, res)=>{
    productos.push(req.body);
    res.redirect('/');
});

exports.routerProducts = routerProducts;