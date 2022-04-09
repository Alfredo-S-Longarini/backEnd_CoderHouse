const {Router} = require('express');

const routerProductos = Router();

let productos = [];

routerProductos.get('/productos', (req, res)=>{
    res.json(productos);
});

routerProductos.get('/productos/:id', (req, res)=>{
    const productId = productos.find(element => element.id == req.params.id);

    (productId ? res.json(productId) : res.send("Error: Producto no encontrado"));
});

routerProductos.post('/productos', (req, res)=>{
    let idObj = 0;
    let contId = productos.length;

    (contId!==0 && (idObj=productos[contId-1].id))

    req.body.id = idObj + 1;

    productos.push(req.body);
    res.json(req.body);
});

routerProductos.put('/productos/:id', (req, res)=>{

    for (let i = 0; i < productos.length; i++) { 
        if(productos[i].id==req.params.id){
            productos[i]=req.body
            productos[i].id=i+1
            break
        }
    }

    res.json(productos);
});

routerProductos.delete('/productos/:id', (req, res)=>{
    const productDelete = productos.filter(element => element.id != req.params.id );
    productos = productDelete;
    console.log("Producto Eliminado");
    res.json(productDelete);
});

exports.routerProductos = routerProductos;