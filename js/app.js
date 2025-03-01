// Esperar a que el DOM se haya cargado completamente
document.addEventListener("DOMContentLoaded", function () {
    // Cargar los productos desde el archivo JSON
    fetch('almacen.json')
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });

    // Función para mostrar los productos
    function mostrarProductos(productos) {
        const productosContainer = document.getElementById('productos');

        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('card');

            productoDiv.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <p class="card-text">${producto.descripcion}</p>
                    <button class="btn btn-primary" 
                        onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio}, '${producto.imagen}')">
                        Agregar a Carrito
                    </button>
                </div>
            `;

            productosContainer.appendChild(productoDiv);
        });
    }
});
