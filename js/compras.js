let products = [];
let title = document.getElementsByClassName("product-title");
let price = document.getElementsByClassName("product-price");
let img = document.getElementsByClassName("product-img");
let btnProduct = document.getElementsByClassName("product-button");
let btnModal = document.getElementById("modal-button");
let modalBody = document.getElementById("t-modal");

//asigna valores a arreglo
for (let i = 0; i < btnProduct.length; i++) {
    btnProduct[i].addEventListener("click", function () {
        //validar el producto en el carrito        
        
        for (let j = 0; j < products.length; j++) {
            if (products[j].objTitle == title[i].textContent) {
                products[j].objCant += 1;
                btnProduct[i].innerHTML =                    
                    'Hay('+ products[j].objCant +') Comprar L <span class="badge text-bg-info text-dark product-price">'+Number(price[i].textContent)+'</span>';
                return;
            }
        }

        let element = new Object();
        element = {
            objTitle: title[i].textContent,
            objPrice: Number(price[i].textContent),
            objImg: img[i].src,
            objCant: 1,
        };

        //

        btnProduct[i].innerHTML =
            'Hay(1) Comprar L <span class="badge text-bg-info text-dark product-price">'+element.objPrice+'</span>';      
        products.push(element);
    });
}

function getTable(head, tbody, title) {
    let table = "";
    table =
        "<div class=table-responsive'>" +
        "<p class='h2 my-4 text-center'>" +
        title +
        "</p>" +
        "<table class='table align-middle text-center'>" +
        "<thead>" +
        head +
        "</thead><tbody>" +
        tbody +
        "</tbody></table></div>";

    return table;
}

function showProducts(modalBody) {
    if (products.length == 0) {
        modalBody.innerHTML =
            "<div class='alert alert-info' role='alert'>" +
            "No ha agregado productos al carrito." +
            "</div>";
    } else {
        let headListproducts =
            "<tr>" +
            "<th>#</th>" +
            "<th>Nombre</th>" +
            "<th class='head-img-table'>Imagen</th>" +
            "<th>Cantidad</th>" +
            "<th>Precio</th>" +
            "<th></th>" +
            "</tr>";
        let tbodyListproducts = "";
        let table;
        let buttonCalculos;

        for (let i = 0; i < products.length; i++) {
            tbodyListproducts +=
                "<tr>" +
                "<td>" +
                (i + 1) +
                "</td>" +
                "<td>" +
                products[i].objTitle +
                "</td>" +
                "<td><img src='" +
                products[i].objImg +
                "' class='img-responsive imagen-producto-venta'></td>" +
                "<td><input type='number' value='" +
                products[i].objCant +
                "' class='cantidad-product'></td>" +
                "<td>L " +
                products[i].objPrice +
                "</td>" +
                "<td><button type='button' class='btn btn-sm btn-danger' onclick='deleteProduct(" +
                i +
                ")'>-</button></td>";
            ("</tr>");
        }

        //Mostramos la lista de productos
        table = getTable(headListproducts, tbodyListproducts, "Lista de Productos");
        //Agregamos boton para realizar caclculos
        buttonCalculos =
            "<div class='d-grid gap-2'>" +
            "<button class='btn btn-primary' type='button' onclick='getCalculates()'>Detalle de Compra</button>" +
            "</div>";
        modalBody.innerHTML = table + buttonCalculos;
    }

    function getCalculates() {
        let tbodyDetails = "";
        let subtotal = 0; //La suma de la Cantidad * Precio de cada producta
        let isv = 0; //15% de impuesto y sera subtotal*impuesto
        let total = 0; //subtotal+impuesto
        let cantidad = document.getElementsByClassName("cantidad-product");
        let detailtable = "";

        for (let i = 0; i < products.length; i++) {
            subtotal += products[i].objPrice * parseInt(cantidad[i].value);
        }

        isv = subtotal * 0.15;
        total = isv + subtotal;

        tbodyDetails =
            "<tr>" +
            "<td>Subtotal:</td><td>" +
            subtotal +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>ISV:</td><td>" +
            isv +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Total:</td><td>" +
            total +
            "</td>" +
            "</tr>";

        detailtable = getTable("", tbodyDetails, "Calculos");
        console.log(tbodyDetails);

        modalBody.innerHTML += detailtable;
    }
}

function getCalculates() {
    let tbodyDetails = "";
    let subtotal = 0; //La suma de la Cantidad * Precio de cada producta
    let isv = 0; //15% de impuesto y sera subtotal*impuesto
    let total = 0; //subtotal+impuesto
    let cantidad = document.getElementsByClassName("cantidad-product");
    let detailtable = "";

    for (let i = 0; i < products.length; i++) {
        subtotal += products[i].objPrice * parseInt(cantidad[i].value);
    }

    isv = subtotal * 0.15;
    total = isv + subtotal;

    tbodyDetails =
        "<tr>" +
        "<td>Subtotal:</td><td>" +
        subtotal +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>ISV:</td><td>" +
        isv +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Total:</td><td>" +
        total +
        "</td>" +
        "</tr>";

    detailtable = getTable("", tbodyDetails, "Calculos");
    console.log(tbodyDetails);

    modalBody.innerHTML += detailtable;
}

function deleteProduct(element) {
    products.splice(element, 1);
    showProducts(modalBody);
}

btnModal.onclick = function () {
    showProducts(modalBody);
};
