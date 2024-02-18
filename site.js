let product = [
    {
        id: 0,
        title: 'Rak',
        price: '100kr',
        imageSrc: 'varak.avif',
    },
    {
        id: 1,
        title: 'Vinkel',
        price: '100kr',
        imageSrc: 'vavinkel.avif',
    },
    {
        id: 2,
        title: 'T-Rör',
        price: '140kr',
        imageSrc: 'vat.avif',
    }
];

function addProductsToStore(title, price, imageSrc) {
    const productCard = document.createElement('div');
    productCard.classList.add('col-md-4');
    productCard.innerHTML = `
        <div class="card">
            <img src="${imageSrc}" loading="lazy" class="buy-image" width="180" height="auto" alt="product-picture"/>
            <h1>${title}</h1>
            <p class="price">${price}</p>
            <p class="title">${title}</p>
            <p>
                <button type="button" data-toggle="modal" data-target="#${title}">
                    Info
                </button>
            </p>
            <p>
                <button>Köp</button>
            </p>
        </div>

        <div id="${title}" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">${title}</h4>
            </div>
            <div class="modal-body">
              <p>Some text in the modal.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

    `;

    const productItems = document.getElementById('productCards');
    productItems.appendChild(productCard);
}


product.forEach(function(product) {
    addProductsToStore(product.title, product.price, product.imageSrc);
});

function addItemToCart(title, price, imageSrc) {
    const cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');
    const cartItems = document.getElementById('cartItem');

    var cartRowContents = `
        <td class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" loading="lazy" alt="product-picture" width="50" height="50">
            <span class="cart-item-title">${title}</span>
        </td>
        <td class="cart-item cart-column">
            <span class="cart-price cart-column">${price}</span>
        </td>
        <td class="cart-item cart-column">
            <button class="btn btn-danger" type="button">Ta bort</button>
        </td>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItems.appendChild(cartRow);
    saveCartToLocalStorage();

}

function saveCartToLocalStorage() {
    const cartItems = document.getElementById('cartItem').innerHTML;
    localStorage.setItem('cartItems', cartItems);
}

let cartItemContainer = document.getElementById('cartItem');

cartItemContainer.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        deleteFromCart(event.target);
    }
});

function loadCartFromLocalStorage() {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        document.getElementById('cartItem').innerHTML = cartItems;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadCartFromLocalStorage();
});


function addToCartClicked(event){
    const button = event.target;
    const shopItem = button.parentElement.parentElement;
    const title = shopItem.getElementsByClassName('title')[0].innerText;
    const price = shopItem.getElementsByClassName('price')[0].innerText;
    const imageSrc = shopItem.getElementsByClassName('buy-image')[0].src;
    addItemToCart(title,price,imageSrc);
}

var buyButtons = document.querySelectorAll('.card button');
buyButtons.forEach(function (button) {
    button.addEventListener('click', addToCartClicked);
});


function deleteFromCart(button) {
    var cartRow = button.parentElement.parentElement;
    cartRow.remove();
    saveCartToLocalStorage();
}

let removeButtons = document.querySelectorAll('.cart button');
removeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        deleteFromCart(this);
    });
});

/* API för väder i skövde.*/

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://api.weatherapi.com/v1/current.json?key=b863852a452744a895f202721241702&q=Skövde&aqi=no')
      .then(response => response.json())
      .then(data => {
        const apiElement = document.getElementById('api');

        if (data && data.current && data.current.temp_c) {
          apiElement.innerHTML = `Temperature in Skövde: ${data.current.temp_c}°C`;
        } else {
          apiElement.innerHTML = 'Går ej att hämta';
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        const apiElement = document.getElementById('api');
        apiElement.innerHTML = 'Går ej att hämta';
      });
});



