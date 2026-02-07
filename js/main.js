
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

const sonidoClick = new Audio("./sounds/click.mp3")
sonidoClick.volume = 0.3

let carrito = []
let total = 0
let carritoAbierto = false

dropdownCarrito.style.display = "none"


formSuscripcion.addEventListener("submit", (e) => {
  e.preventDefault()

  if (inputEmail.value.trim() === "") {
    alert("Por favor ingresá un email")
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

const productos = [
  {
    id: 1,
    nombre: "Ramo Girasoles",
    precio: 18000,
    descripcion: "Girasoles frescos y vibrantes.",
    imagen: "./assets/ramodegirasoles.png"
  },
  {
    id: 2,
    nombre: "Arreglo Mixto",
    precio: 15500,
    descripcion: "Flores amarillas y blancas.",
    imagen: "./assets/ramodeflores.jpeg"
  },
  {
    id: 3,
    nombre: "Centro de Mesa",
    precio: 12000,
    descripcion: "Centro floral natural.",
    imagen: "./assets/floresvarias.png"
  }
]

function renderizarProductos() {
  contenedorProductos.innerHTML = ""

  productos.forEach(producto => {
    contenedorProductos.innerHTML += `
      <div class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio">$${producto.precio}</p>
        <button class="btn-producto" data-id="${producto.id}">
          Agregar al carrito
        </button>
      </div>
    `
  })
}

renderizarProductos()


document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-producto")) {
    reproducirSonido()

    const id = Number(e.target.dataset.id)
    const producto = productos.find(p => p.id === id)

    carrito.push(producto)
    renderizarCarrito()
  }
})

function renderizarCarrito() {
  carritoContainer.innerHTML = ""
  total = 0

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>Tu carrito está vacío 😅</p>"
    totalCarrito.textContent = ""
    return
  }

  carrito.forEach(producto => {
    total += producto.precio
    carritoContainer.innerHTML += `
      <div class="item-carrito">
        <p class="nombre-producto">${producto.nombre}</p>
        <p class="precio">$${producto.precio}</p>
      </div>
    `
  })

  totalCarrito.textContent = `Total: $${total}`
}

btnToggleCarrito.addEventListener("click", () => {
  reproducirSonido()
  carritoAbierto = !carritoAbierto
  dropdownCarrito.style.display = carritoAbierto ? "block" : "none"
})
  
botonFinalizar.addEventListener("click", () => {
  reproducirSonido()
  if (carrito.length === 0) {
    dropdownCarrito.innerHTML = `
      <p class="mensaje-carrito">
        Tu carrito está vacío 😅
      </p>
    `
    return
  }

  dropdownCarrito.innerHTML = `
    <div class="mensaje-carrito exito">
      <h3>¡Gracias por tu compra! 💛</h3>
      <p>Esperamos que disfrutes nuestros productos 🌻</p>
    </div>
  `

  carrito = []

  setTimeout(() => {
    dropdownCarrito.style.display = "none"
    carritoAbierto = false
    renderizarCarrito()
  }, 2000)
})


function reproducirSonido() {
  sonidoClick.currentTime = 0
  sonidoClick.play()
}




  












 



  














    











  

  













