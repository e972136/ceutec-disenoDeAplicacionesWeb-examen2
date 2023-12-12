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
        "<table class='table align-middle'>" +
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
            "<th class='head-img-table'>Imagen</th>" +
            "<th>Nombre</th>" +            
            "<th>Precio</th>" +
            "<th>Cantidad</th>" +            
            "<th>  </th>" +
            "</tr>";
        let tbodyListproducts = "";
        let table;
        let buttonCalculos;

        for (let i = 0; i < products.length; i++) {
            tbodyListproducts +=
                "<tr>" +                
                "<td class='col-5'><img src='" + products[i].objImg + "' class='img-responsive imagen-producto-venta'></td>" +
                "<td class='col-4'>" + products[i].objTitle + "</td>" +                
                "<td class='col-1'>L " + products[i].objPrice + "</td>" +
                "<td class='col-1'><input type='number' value='" + products[i].objCant + "' class='form-control cantidad-product'></td>" +                
                "<td class='col-1'><button type='button' class='btn btn-sm btn-danger' onclick='deleteProduct("+ i +")'> X </button></td>"+
                "</tr>";        
        }

        //Mostramos la lista de productos
        table = getTable(headListproducts, tbodyListproducts, " ");
        //Agregamos boton para realizar caclculos
        buttonCalculos =
            "<div class='d-grid gap-2'>" +
            "<button class='btn btn-warning' type='button' onclick='getCalculates()'>Calcular</button>" +
            "</div>";
        modalBody.innerHTML = table + buttonCalculos;
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
            "<th>Subtotal:</th><td>L " + subtotal + "</td>" +  
        "</tr>" +
        "<tr>" +
            "<th>ISV:</th><td>L " + isv + "</td>" +
        "</tr>" +
        "<tr>" +
            "<th>Total:</th><td>L " + total + "</td>" +
        "</tr>";

    detailtable = getTable("", tbodyDetails, " ");
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
