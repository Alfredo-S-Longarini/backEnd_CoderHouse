let fs = require('fs');

let productsInFile=[];

const testProducts=[{nameProd: "Razer Deathadder v2", price: 6400, img: ''}, 
{nameProd: "Razer Huntsman Mini", price: 14500, img: ''}, 
{nameProd: "Razer Kraken Ultimate", price: 25000, img: ''}];

const newProduct= {nameProd: "Razer Seiren Mini", price: 14000, img: ''}

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

            (contId!==0 && (idObj=contParse[contId-1].id));

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

const fileTest = new Contenedor('./clase4/datos.txt'); 

async function ejecutarCodigo(){

    for (let i = 0; i < testProducts.length; i++) {
        console.log('id asignado:', await fileTest.save(testProducts[i])); 
    }
    console.log("---------------------------------");
    console.log("Producto nuevo asignado: ");
    console.log('id asignado:', await fileTest.save(newProduct));
    console.log("---------------------------------");
    console.log("El objeto en la posición",2, "es:");
    console.log(await fileTest.getbyId(2));
    console.log("---------------------------------");
    console.log("Los objetos del archivo son: ");
    console.log(await fileTest.getAll());
    console.log("---------------------------------");
    console.log("Objeto borrado");
    console.log(await fileTest.deleteById(2));
    console.log("---------------------------------");
    console.log("Archivo vacio");
    console.log(await fileTest.deleteAll());
}

ejecutarCodigo();

export default Contenedor;