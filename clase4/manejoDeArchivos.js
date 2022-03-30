const fs = require('fs');

//Array de productos que se utilizaran para mostrar el funcionamiento del codigo.
const testProducts=[{nameProd: "Razer Deathadder v2", price: 6400, img: './clase4/img/razerV2.jpg'}, 
{nameProd: "Razer Huntsman Mini", price: 14500, img: './clase4/img/huntsmanMini.jpg'}, 
{nameProd: "Razer Kraken Ultimate", price: 25000, img: './clase4/img/razerKraken.jpg'}];

//Array que contendrá y administrará todos los objetos presentes en el archivo .txt.
let productsInFile=[];

//Objeto nuevo que se agrega a la lista.
const newProd={nameProd: "Razer Siren Mini", price: 10000, img: './clase4/img/SeirenMini.jpg'}

class Contenedor{
    constructor(name){
        this.nameFile=name;
    }

    save(object){ //Guarda los objetos del array testProducts en el archivo txt. Previamente verifica si el objeto enviado se encuentra o no agregado.
        const inArray=productsInFile.find(element=>element.nameProd==object.nameProd);

        if(inArray){
            return "El elemento ya se encuentra en el archivo."
        }else{
            object.id=productsInFile.length+1;
            productsInFile.push(object);
            fs.appendFileSync(this.nameFile, JSON.stringify(object));
            return object.id;
        }
    }

    getbyId(num){//Muestra un el objeto asociado al id ingresado.
        const inArray=testProducts.find(element=>element.id===num);

        if(inArray){
            return testProducts[num];
        }else{
            return "No se encontro el producto"
        }
    }

    getAll(){//Muestar un array con los nombres de los productos.
        const nameProds=[];

        for(let i=0; i<productsInFile.length; i++){
            nameProds.push(productsInFile[i].nameProd);
        }

        return nameProds;
    }

    deleteById(numId){//Borra el objeto asociado al id ingresado.
        const newListProd = productsInFile.filter((item)=>item.id!==numId)
        try{
            fs.promises.writeFile(this.nameFile, JSON.stringify(newListProd));
            productsInFile=newListProd;
            console.log('Objeto eliminado!');
        }
        catch(err){
            console.log("Hubo un error");
        }
    }

    deleteAll(){//Borra todo el contenido del archivo.
        try{
            fs.promises.writeFile(this.nameFile, "");
            console.log('El contenido del archivo se borro con exito!');
        }
        catch(err){
            console.log("Hubo un error");
        }
    }
}


const fileTest = new Contenedor('./clase4/productos.txt');

testProducts.forEach(element=>console.log('id asignado: '+fileTest.save(element)));//Carga al archivo los objetos de testProducts.

console.log('id asignado: '+fileTest.save(newProd));//Muestra el id asignado al nuevo objeto.

console.log('El objeto es: ',fileTest.getbyId(1));//Muestra el objeto que posee id 1.

console.log('Los objetos en el archivo son: ',fileTest.getAll());//Muestro los nombres de los objetos que se encuentran en el archivo.

fileTest.deleteById(2);//Borra el objeto con id nro 2 y actualiza el contenido del archivo.

fileTest.deleteAll();//Elimino todo el contenido del archivo.



