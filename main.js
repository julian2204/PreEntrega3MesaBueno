let assortment = [
    {
        id : 1,
        name : "Iphone XR",
        price : 1500,
        stock : 10,
        category : "Celular",
        posterUrl: "https://i.pinimg.com/736x/66/16/41/661641025b358aff6dbdbb72b086af67.jpg"
    },
    {
        id : 2,
        name : "Exclusiv led Smart",
        price : 1984,
        stock : 12,
        category : "Televisor",
        posterUrl: "https://panamericana.vtexassets.com/arquivos/ids/426153/televisor-exclusiv-de-32-led-smart-tv-e32v2hn-2-7709011593909.jpg?v=637798708965430000"
    },
    {
        id : 3,
        name : "Xiaomi Redmi Note 11",
        price : 194,
        stock : 14,
        category : "Celular",
        posterUrl: "https://exitocol.vtexassets.com/arquivos/ids/17243849/Celular-XIAOMI-Xiaomi-Redmi-Note-11-128GB-Gris-128-GB-Gris-3191550_a.jpg?v=638156935109630000"
    },
    {
        id : 4,
        name : "Samsung serie 7",
        price : 2000,
        stock : 9,
        category :"Televisor",
        posterUrl: "https://http2.mlstatic.com/D_NQ_NP_769801-MLA46796527976_072021-O.jpg"
    },
    {
        id : 5,
        name : "Samsung galaxy A33",
        price : 500,
        stock : 11,
        category : "Celular", 
        posterUrl: "https://exitocol.vtexassets.com/arquivos/ids/16830769-800-auto?v=638139875496700000&width=800&height=auto&aspect=true"
    },
    {
        id : 6,
        name : "PlayStation 5",
        price : 2007,
        stock : 10,
        category : "Consola",
        posterUrl: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
    },
    {
        id : 7,
        name : "Xbox series X",
        price : 2002,
        stock : 3,
        category :"Consola",
        posterUrl: "https://diem.com.co/wp-content/uploads/2022/12/61JGKhqxHxL._SL1500_.jpg"
    },
    {
        id : 8,
        name : "Audifonos gamer be mix",
        price : 20,
        stock : 13,
        category : "Audifonos",
        posterUrl: "https://cdn1.totalcode.net/homesentry/product-zoom/es/audifonos-gamer-be-mix-negro-ht2022-1.webp"
    },
    {
        id : 9,
        name : "Audifonos gamer Logitech G335",
        price : 21,
        stock : 12,
        category : "Audifonos",
        posterUrl: "https://cdn.shopify.com/s/files/1/0172/8076/1910/products/audifonos_logitech_g335_300x.jpg?v=1666214015"
    },
    {
        id : 10,
        name : "Audifonos inalambricos Xbox",
        price : 27,
        stock : 7,
        category : "Audifonos", 
        posterUrl: "https://m.media-amazon.com/images/I/61EGsO96eGL._AC_SX466_.jpg"
    }
]

let products = assortment.map(({id,name,price, stock, category, posterUrl}) => new Products(id, name, price, stock, category, posterUrl))
let carrito = []
let carritoDOM = document.getElementById("carrito")

renderizarProductos(products)
function renderizarProductos(arrayProductos){
    let contenedor = document.getElementById("contenedorProductos")
    contenedor.innerHTML = ""
    arrayProductos.forEach(({id,name,category, posterUrl, price }) => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "tarjetaProducto"

        tarjetaProducto.innerHTML = `
        <h2 class= tituloProducto>${name}</h2>
        <p>${category}</p>
        <img src = ${posterUrl}>
        <h3> Precio: ${price} </h3>
        <button id=${id}>Agregar al carrito</button> 
        `
        contenedor.appendChild(tarjetaProducto)

        let boton = document.getElementById(id)
        boton.addEventListener("click",agregarProductoAlCarrito)
    })
}

function agregarProductoAlCarrito(e){
    let productoAgregado = products.find(({id}) => id == e.target.id)
    if(carrito.some(producto => producto.id == productoAgregado.id)){
        let pos = carrito.findIndex(producto => producto.id == productoAgregado.id)
        carrito[pos].units++
        carrito[pos].subtotal = carrito[pos].priceUnit * carrito[pos].units 

    }else{
        carrito.push({
            id: productoAgregado.id,
            name: productoAgregado.name,
            priceUnit : productoAgregado.price,
            units: 1,
            subtotal: productoAgregado.price
        })
    }
    renderizarCarrito(carrito)
}

function renderizarCarrito(arrayProductos){
    carritoDOM.innerHTML = ""
    arrayProductos.forEach(({name, subtotal, units}) => {
        carritoDOM.innerHTML += `<h3> ${name} ${subtotal} ${units} </h3>` 
    }

    )
}

let productoBuscado = document.getElementById("productoBuscado")
productoBuscado.addEventListener("change", filtrar)
let buscador = document.getElementById("buscador")
buscador.addEventListener("click", filtrar)

function filtrar(){
    let arrayFiltrado = products.filter(({name}) => name.toLowerCase().includes(productoBuscado.value.toLowerCase()))
    renderizarProductos(arrayFiltrado)
    
}