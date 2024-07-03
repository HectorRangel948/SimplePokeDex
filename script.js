var endPoint = document.querySelector(".barraBuscar");
let contenedorPokemones = document.querySelector(".contenedorPokemones");
const botonBuscar = document.querySelector(".botonBuscar");
var todosLosPokemones = document.querySelector("#todos");
var bulletPointValue = 0;
const cantidadTotalDePokemones = 1281;
const cantidadDeBulletPoints = cantidadTotalDePokemones / 20;


/**********************************************************/
/*Switch para mostrar todos los pokemones */
todosLosPokemones.addEventListener("change", () => {

    if (todosLosPokemones.checked == true) {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
            .then(res => res.json())
            .then(response => {
                for (let j = 0; j < 20; j++) {
                    buscarPokemon(response.results[j].name);
                }
            })

        for (let i = 0; i < cantidadDeBulletPoints; i++) {
            carrousel(i * 20);
        }
    }

    else{
        eliminarContenido();
        eliminarBullets();
    }
});

/**********************************************************/

function buscarPokemon(nombrePokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`)
        .then(res => res.json())
        .then(response => {

            contenedorPokemones = document.querySelector(".contenedorPokemones");

            let tarjetaPokemon = document.createElement("div");
            tarjetaPokemon.className = "tarjetaPokemon";
            let nombre = document.createElement("h2");
            nombre.className = "nombre";
            let img = document.createElement("img");
            img.className = "imagen";
            let id = document.createElement("p");
            id.className = "idPokemon";

            nombre.textContent = (upperCaseFirstLetter(response.name));
            img.src = response.sprites.front_default;
            id.textContent = "id: " + response.id;

            tarjetaPokemon.appendChild(nombre);
            tarjetaPokemon.appendChild(img);
            tarjetaPokemon.appendChild(id);
            contenedorPokemones.appendChild(tarjetaPokemon);
        }

        )
        .catch(function () {
            let tarjetaPokemon = document.createElement("div");
            tarjetaPokemon.className = "tarjetaPokemon";
            let nombre = document.createElement("h2");
            nombre.className = "nombre";
            nombre.textContent = (upperCaseFirstLetter(`${nombrePokemon} not found`));
            tarjetaPokemon.appendChild(nombre);
            contenedorPokemones.appendChild(tarjetaPokemon);

        })
}

/**********************************************************/

/*Funcion para traer todos los pokemones y listarlos cuando se selecciona la checkbox */
function traerTodo(posicion) {
    if (todosLosPokemones.checked == true) {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${posicion}&limit=20`)
            .then(res => res.json())
            .then(response => {
                for (let j = 0; j < 20; j++) {
                    buscarPokemon(response.results[j].name);
                }

            })
    }
}

/**********************************************************/
/*Funcion para que la primera letra del nombre sea mayúscula */
function upperCaseFirstLetter(res) {
    let first = res.charAt(0).toUpperCase();
    let rest = res.slice(1);
    return first + rest;
}
/**********************************************************/
/*Buscar nombre de pokemon en el input*/
/*Es necesario que la funcioón esté dentro de una función flecha para que no entre al inicio sin ser llamada por el evento del click */
botonBuscar.addEventListener("click", () => {
    buscarPokemon(endPoint.value);
})

endPoint.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        buscarPokemon(endPoint.value);
    }
})



/*Función que crea los bulletpoints y les asigna su comportamiento y caracteríscticas*/
function carrousel(value) {
    let bulletPoint = document.createElement("div");
    bulletPoint.className = "bulletPoint";
    bulletPoint.innerHTML=(value/20)+1;
    const bulletPointsContenedor = document.querySelector(".bulletPoints-contenedor");
    bulletPointsContenedor.appendChild(bulletPoint);
    bulletPoint.value = value;
    bulletPoint.addEventListener("click", () => {
        eliminarContenido();
        traerTodo(bulletPoint.value);
    })
}

/*Elimina las tarjetas que se muestran en pantalla */
function eliminarContenido() {
    let eliminarContenedorPokemones = document.querySelector(".contenedorPokemones");
    eliminarContenedorPokemones.remove();

    let agregarContenedorPokemones = document.createElement("div");
    agregarContenedorPokemones.className = "contenedorPokemones";

    let areaTarjetas = document.querySelector(".areaTarjetas");
    areaTarjetas.appendChild(agregarContenedorPokemones);
}

function eliminarBullets(){
    let eliminarBulletsContenedor = document.querySelector(".bulletPoints-contenedor");
    eliminarBulletsContenedor.remove();
    
    let crearBulletsContenedor = document.createElement("div");
    crearBulletsContenedor.className="bulletPoints-contenedor";

    let areaBullets = document.querySelector(".areaBullets");
    areaBullets.appendChild(crearBulletsContenedor);
}