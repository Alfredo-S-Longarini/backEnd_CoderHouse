const express = require('express');
let fs = require('fs');
const app = express();

let productsInFile=[];
class Contenedor{

    constructor(ruteFile){
        this.nameFile=ruteFile;
    }

    async escribirArchivo(date){
        try{
            return await fs.promises.writeFile(this.nameFile, date);
        }catch(error){
            console.log(error);
        }
    }

    async borrarArchivo(){
        try{
            await fs.promises.writeFile(this.nameFile, []);
        }catch(error){
            console.log(error);
        }
    }

    async leerArchivo(){
        try{
            const data = await fs.promises.readFile(this.nameFile, 'utf-8');
            return data;
        }catch (error){
            console.log(error);
        }
    }

    async save(object){//Guarda los objetos corroborando, previamente, si se encuantran en el archivo.

        try{
            const cont = await this.leerArchivo()
            let contParse = JSON.parse(cont);
            let idObj = 0;
            let contId = contParse.length;

            (contId!==0 && (idObj=contParse[contId-1].id))

            object.id = idObj + 1;
            contParse.push(object);
            contParse = JSON.stringify(contParse);
            await fs.promises.writeFile(this.nameFile, contParse);
            return object.id;


        }catch(error){
            console.log(error);
        }
    }

    async getbyId(num){//Muestra un el objeto asociado al id ingresado.
        
        try{
            const dataFile = await this.leerArchivo();
            const parseDataFile=JSON.parse(dataFile)
            const elemento = parseDataFile.find(element=>element.id==num);
            return elemento;

        }catch(error){
            console.log("Error:", error);
        }
    }

    async getAll(){//Muestar un array con los nombres de los productos.'
        try{
            const data = await this.leerArchivo();
            return data;
        }catch(error){
            console.log(error);
        }
    }

    async deleteById(numId){//Borra el objeto asociado al id ingresado.

        try{
            const dataFile = await this.leerArchivo();
            const parseDataFile = JSON.parse(dataFile)
            const elemento = parseDataFile.filter(element=>element.id!==numId);
            await this.escribirArchivo(JSON.stringify(elemento));
            const newData = await this.leerArchivo();
            return newData;

        }catch(error){
            console.log(error);
        }
    }

    async deleteAll(){//Borra todo el contenido del archivo.
        productsInFile=[];
        await this.escribirArchivo(JSON.stringify(productsInFile))
        const voidFile = await this.leerArchivo();
        return voidFile;
    }
}

function random(min, max) {//Funcion que utilizo para obtener un numero random entre un minimo y un maximo.
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

const fileTest = new Contenedor('./clase6/productos.txt');

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor Http escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor ${error}`));


app.get('/', (req, res) => {
    res.send({mensaje: 'Home'});
});
    
app.get('/productos', async (req, res) => {//Muestra todos los objetos del archivo.
    res.send(await fileTest.getAll());
});

app.get('/productoRandom', async (req, res) => {//Muestra un objeto random de los que se encuentran en el archivo. 
    const max = JSON.parse(await fileTest.getAll()).length;

    res.send(await fileTest.getbyId(random(1, max)));
})

