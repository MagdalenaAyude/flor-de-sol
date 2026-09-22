const formSuscripcion = document.getElementById("form-suscripcion")
const inputEmail = document.querySelector("#form-suscripcion input")
const formContainer = document.getElementById("form-container")
const mensajeSuscripcion = document.getElementById("mensaje-suscripcion")
const contenedorProductos = document.getElementById("productos-grid")
const btnToggleCarrito = document.getElementById("btn-toggle-carrito")
const dropdownCarrito = document.getElementById("dropdown-carrito")
const carritoContainer = document.getElementById("carrito-container-header")
const totalCarrito = document.getElementById("total-carrito-header")
const botonFinalizar = document.getElementById("finalizar-compra")
const botonVaciarCarrito = document.getElementById("vaciar-carrito")

let carrito = []
let cantidadesTarjetas = {}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}


function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito")

  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado)
  }
}

let carritoAbierto = false
const numeroWhatsApp = "542915094533"

const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
})

botonVaciarCarrito.addEventListener("click", () => {

  carrito = []
  cantidadesTarjetas = {}

  guardarCarrito()
  renderizarCarrito()
  renderizarProductos()
})


 
btnToggleCarrito.addEventListener("click", () => {
  carritoAbierto = !carritoAbierto

  dropdownCarrito.style.display = carritoAbierto
    ? "block"
    : "none"
})


formSuscripcion.addEventListener("submit", (e) => {
  e.preventDefault()

  if (!inputEmail.checkValidity()) {
    inputEmail.reportValidity()
    return
  }

  mensajeSuscripcion.innerHTML = `
      <br>
    🌻 <strong>¡Gracias por suscribirte!</strong><br><br>
    Aprovechá tu <strong>15% OFF</strong> en tu primera compra.
  `

  inputEmail.value = ""

  setTimeout(() => {
    formContainer.style.display = "none"
  }, 3000)
})

    botonFinalizar.addEventListener("click", () => {

  let mensaje = "Hola, Flor de Sol 🌻\n\n"
  mensaje += "Quisiera hacer el siguiente pedido:\n\n"

  let total= 0

  

  carrito.forEach(item => {

    const producto = productos.find(p => p.id === item.id)

    const subtotal = producto.precio * item.cantidad
    total += subtotal

    mensaje += `• ${producto.nombre} x${item.cantidad}\n\n`
  })

  mensaje += `💰 Total: ${formatoPrecio.format(total)}`

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`

  window.open(url, "_blank")
})



const productos = [
  {
    id: 1,
    nombre: "Ramo Girasoles",
    precio: 18000,
    descripcion: "Girasoles frescos y vibrantes.",
    imagen: "./assets/ramodegirasoles.png",
    disponible: true,
  },
  {
    id: 2,
    nombre: "Arreglo Mixto",
    precio: 15500,
    descripcion: "Flores amarillas y blancas.",
    imagen: "./assets/ramodeflores.jpeg",
    disponible: true,
  },
  {
    id: 3,
    nombre: "Centro de Mesa",
    precio: 12000,
    descripcion: "Centro floral natural.",
    imagen: "./assets/floresvarias.png",
    disponible: true,
  }
]


document.addEventListener("click", (e) => {

  if (!e.target.classList.contains("btn-producto")) {
    return
  }

  const id = Number(e.target.dataset.id)
  const producto = productos.find(p => p.id === id)

  if (!producto || !producto.disponible) {
    return
  }

 const productoEnCarrito = carrito.find(item => item.id === id)

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++
  } else {
    carrito.push({
      id: id,
      cantidad: 1
    })
  }
        cantidadesTarjetas[id] = 1
  guardarCarrito()
  renderizarCarrito()
  renderizarProductos()
}) 


function renderizarProductos() {
  contenedorProductos.innerHTML = ""

  productos.forEach(producto => {

    const cantidad = cantidadesTarjetas[producto.id] || 0

    const botonProducto = !producto.disponible
      ? `
        <button class="btn-producto" disabled>
          Sin stock
        </button>
      `
      : cantidad === 0
      ? `
        <button class="btn-producto" data-id="${producto.id}">
          Agregar al carrito
        </button>
      `
      : `
        <div class="cantidad-producto">
          <button class="btn-restar" data-id="${producto.id}">−</button>
          <span>${cantidad}</span>
          <button class="btn-sumar" data-id="${producto.id}">+</button>
        </div>
      `

    contenedorProductos.innerHTML += `
      <div class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio">${formatoPrecio.format(producto.precio)}</p>
        ${botonProducto}
      </div>
    `
  })
}





document.addEventListener("click", (e) => {

  if (e.target.classList.contains("btn-sumar")) {

    const id = Number(e.target.dataset.id)
    const producto = carrito.find(p => p.id === id)

    if (producto) {
      producto.cantidad++
      cantidadesTarjetas[id]++
      
      guardarCarrito()
      renderizarCarrito()
      renderizarProductos()
      
    }
  }


  if (e.target.classList.contains("btn-restar")) {

    const id = Number(e.target.dataset.id)
    const producto = carrito.find(p => p.id === id)

    if (producto) {

      if (producto.cantidad > 1) {
        producto.cantidad--
        cantidadesTarjetas[id]--
      } else {
        carrito = carrito.filter(p => p.id !== id)
      }

      guardarCarrito()
      renderizarCarrito()
      renderizarProductos()
    }
  }
})




function renderizarCarrito() {
  carritoContainer.innerHTML = ""

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p class='carrito-vacio'>Tu carrito está vacío</p>"
    totalCarrito.textContent = `Total: ${formatoPrecio.format(0)}`
    botonVaciarCarrito.style.display = "none"
    botonFinalizar.textContent = "Pedir por WhatsApp"
    return
  }

  let total = 0

  botonVaciarCarrito.style.display = "block"

  carrito.forEach(item => {

    const producto = productos.find(p => p.id === item.id)

    if (!producto) {
      return
    }

    const subtotal = producto.precio * item.cantidad
    total += subtotal

    carritoContainer.innerHTML += `
      <div class="item-carrito">

        <p class="nombre-producto">${producto.nombre}</p>

        <p class="precio">
          ${formatoPrecio.format(subtotal)}
        </p>

        <div class="cantidad-carrito">
          <button class="btn-restar" data-id="${producto.id}">−</button>
          <span>${item.cantidad}</span>
          <button class="btn-sumar" data-id="${producto.id}">+</button>
        </div>

      </div>
    `
  })

  totalCarrito.textContent = `Total: ${formatoPrecio.format(total)}`
  botonFinalizar.textContent = "Pedir por WhatsApp"
}

cargarCarrito()
renderizarProductos()
renderizarCarrito()
 




  












 



  














    











  

  













