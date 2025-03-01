// Script para manejar el carrito de compras

class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 1;
    }
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para agregar producto al carrito
function agregarAlCarrito(id, nombre, precio, imagen) {
    let productoExistente = carrito.find(prod => prod.id === id);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const nuevoProducto = new Producto(id, nombre, precio, imagen);
        carrito.push(nuevoProducto);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    mostrarMensaje("✅ Producto agregado al carrito");
}

// Función para comprar un producto (agrega al carrito y redirige)
function comprarAhora(id, nombre, precio, imagen) {
    agregarAlCarrito(id, nombre, precio, imagen);
    setTimeout(() => {
        window.location.href = "carrito.html";
    }, 500);
}

// Función para actualizar el carrito
function actualizarCarrito() {
    let contenedorCarrito = document.getElementById("contenedor-carrito");
    if (!contenedorCarrito) return; // Evita errores si la página no tiene el contenedor
    let total = 0;
    contenedorCarrito.innerHTML = "";
    
    carrito.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("producto-carrito");
        div.innerHTML = `
            <img src="${producto.imagen}" width="50">
            <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;
        contenedorCarrito.appendChild(div);
        total += producto.precio * producto.cantidad;
    });

    let totalCarrito = document.getElementById("total-carrito");
    if (totalCarrito) {
        totalCarrito.innerText = `Total: $${total}`;
    }
}

// Función para mostrar un mensaje flotante en la pantalla
function mostrarMensaje(mensaje) {
    let mensajeDiv = document.getElementById("mensaje-carrito");
    
    if (!mensajeDiv) {
        mensajeDiv = document.createElement("div");
        mensajeDiv.id = "mensaje-carrito";
        document.body.appendChild(mensajeDiv);
    }

    mensajeDiv.textContent = mensaje;
    mensajeDiv.classList.add("mostrar");

    setTimeout(() => {
        mensajeDiv.classList.remove("mostrar");
    }, 3000);
}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Cargar el carrito al iniciar la página
document.addEventListener("DOMContentLoaded", actualizarCarrito);
