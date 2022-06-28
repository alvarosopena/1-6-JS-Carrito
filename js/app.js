//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener("click", () =>{ //hacemos funcion anonima porque es poco codigo
        articulosCarrito = []; //resetamos el arreglo
        limpiarHTML(); //Eliminamos HTML
        
    })

}


//Funciones
function agregarCurso(e) {
    e.preventDefault();
    //Nos aseguramos que el user haya apretado agregar carrito
    if( e.target.classList.contains("agregar-carrito") ) {        
       // console.log(e.target.parentElement.parentElement);
       //Accedemos el div con el contenido del curso
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCursos(cursoSeleccionado);
    }

}

//Eliminar curso del carrito
function eliminarCurso(e){
    // console.log(e.target.classList);
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");
        //console.log(cursoId);

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter (curso => curso.id !== cursoId); //creamos arreglo con los articulos que no eliminamos
        console.log(articulosCarrito);

        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML

    }
}

//Lee el contenido del HTML y extrae la info.
function leerDatosCursos(curso){
    //console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen : curso.querySelector("img").src,
        titulo : curso.querySelector("h4").textContent,
        precio : curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    }
    console.log(infoCurso);

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some ( curso => curso.id === infoCurso.id );
    console.log(existe)
    if (existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso //Retorna el obj actualizado
            } else {
                return curso; //Retorna los objetos no duplicados
            }
        });
        articulosCarrito = [...cursos]
    } else {
        //Agrega elementos al arreglo carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

  
    console.log(articulosCarrito);
    //imprimimos el HTML
    carritoHTML();

}

//Muestra el carrito en el HTML
function carritoHTML(){

    //Limpiar el HTML previo
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        console.log(curso);
        const row = document.createElement("tr"); //creamos un table row en el table body
        row.innerHTML= `
        <td> 
            <img src="${imagen}" width="100"> 
        </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td> 
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;
        
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    })

}

//Elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML = "";
    
    //comprueba si hay un hijo y lo elimina
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}