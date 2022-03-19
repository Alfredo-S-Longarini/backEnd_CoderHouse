//Array de prueba de usuarios.
const userTest=[{name: "Nicolas", lastName:"Gimenez", libros:[{nameBook:"El Alquimista", nameAutor:"Paulo Coelho"}], mascotas:['Coco']},
            {name: "Fernando", lastName:"Gutierrez", libros:[{nameBook:"El Resplandor", nameAutor:"Stephen King"}], mascotas:['Toby', 'Oliver']},
            {name: "Erica", lastName:"Martinez", libros:[{nameBook:"Los Juegos del Hambre", nameAutor:"Suzanne Collins"}], mascotas:['Max', 'Rocky', 'Milo']}
];

//Array de prueba de libros.
const bookTest=[{nameBook:'La quinta montaña', nameAutor:'Paulo Coelho'}, 
                {nameBook:'It', nameAutor:'Stephen King'}, 
                {nameBook:'Los Juegos del Hambre: En Llamas', nameAutor:'Suzanne Collins'}
]



//Creo la clase Usuario.
class Usuario{

    //Creo el constructor la clase Usuario.
    constructor(nombre, apellido, libros, mascotas){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascota=mascotas
    }

    //Método que devuelve el nombre compreto del usuario.
    get fullName(){
        return this.nombre+" "+this.apellido;
    }

    //Método que agrega una mascota.
    addMascota(nameMascota){    
        this.mascota.push(nameMascota);
    }

    //Método que devuelve la cantidad de mascotas del usuario.
    countMascotas(){
        return this.mascota.length;
    }

    //Método que agrega un libro.
    addBook(nombreLibro, autor){
        const newlibro={
            nameBook:nombreLibro,
            nameAutor:autor
        }

        this.libros.push(newlibro);
    }

    //Método que muestra un array con los titulos de todos los libros del usuario.
    get bookNames(){
        const nameLibros=[];

        for(let i=0; i<this.libros.length; i++){
            nameLibros.push(this.libros[i].nameBook);
        }

        return nameLibros;
    }
}

for(let i=0; i<userTest.length; i++){

    //Creo los Usuarios utilizando los datos del array de prueba userTest.
    const user = new Usuario(userTest[i].name, userTest[i].lastName, userTest[i].libros, userTest[i].mascotas);

    console.log("Nombre: ", user.fullName); //Muestro el nombre del usuario utilizando fullName.
    console.log("Cantidad de mascotas: ", user.countMascotas()); //Muestro la cantidad de mascotas del usuario utilizando countMascotas().
    console.log("Nombre libros: ", user.bookNames); //Muestro un array con los nombres de los libros del usuario, utilizando bookNames.

    user.addBook(bookTest[i].nameBook, bookTest[i].nameAutor); //Asigno un libro del array bookTest utilizando addBook();
    console.log("Libro nuevo agregado: ", user.bookNames); //Muestro nuevamente el array con los nombres de los libros para que se visualice el nuevo libro.
    console.log("---------------------------------------------------------");
}



