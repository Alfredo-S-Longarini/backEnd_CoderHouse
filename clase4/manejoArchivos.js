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

    save(object){//Guarda los objetos corroborando, previamente, si se encuantran en el archivo.

        const data = fs.readFileSync(this.nameFile, 'utf-8');//Se obtienen los datos del archivo.

        productsInFile=JSON.parse(data);//Se guardan en un array.

        const inArray=productsInFile.find(element=>element.nameProd==object.nameProd);//Busco en el array si algun elemento coincide con el objeto a guardar.

        if(inArray){
            return "El elemento ya se encuentra en el archivo."//Si es vardad muestra este mensaje.

        }else{//Si es falso pushea el objeto al array, se le asigna un id y se sobreescribe el archivo.
            object.id=productsInFile.length+1; 
            productsInFile.push(object);
            fs.writeFileSync(this.nameFile, JSON.stringify(productsInFile));
            return object.id;
        }
    }

    getbyId(num){//Muestra un el objeto asociado al id ingresado.
        const inArray=productsInFile.find(element=>element.id==num);
        
        if(inArray){
            return productsInFile[num-1];
        }else{
            return "No se encontro el producto";
        }
    }

    getAll(){//Muestar un array con los nombres de los productos.
        productsInFile.forEach(element => {
            console.log(element);
        });
    }

    deleteById(numId){//Borra el objeto asociado al id ingresado.

        const newListProd = productsInFile.filter((item)=>item.id!==numId);
        productsInFile = newListProd;
        fs.writeFileSync(this.nameFile, JSON.stringify(newListProd));

    }

    deleteAll(){//Borra todo el contenido del archivo.
        productsInFile=[];
        fs.writeFileSync(this.nameFile, JSON.stringify(productsInFile));
        console.log("El contenido del archivo se borro con exito!");
    }
}

const fileTest = new Contenedor('./clase4/datos.txt'); 

testProducts.forEach(element=>console.log('id asignado: '+fileTest.save(element)));//Carga al archivo los objetos de testProducts.

console.log(fileTest.getbyId(2));//Pido que me muestre el objeto con id 2.

console.log('------------------------------------------------------------------------------------------------------------------------');

fileTest.getAll();//Muestra todos los objetos en el archivo.

console.log('------------------------------------------------------------------------------------------------------------------------');

fileTest.deleteById(2);//Borro objeto con id 2.
fileTest.getAll();//Vuelvo a mostrar todos los objetos para corroborar que se haya eliminado objeto correcto.

console.log('------------------------------------------------------------------------------------------------------------------------');

console.log('id asignado al nuevo objeto: '+fileTest.save(newProduct));//Agrego un nuevo objeto al archivo. 
fileTest.getAll();//Muestro todos los objetos para corroborar que se hayan cargado bien el objeto.

fileTest.deleteAll();//Borro todo el contenido del archivo.