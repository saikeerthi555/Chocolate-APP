let carts = document.querySelectorAll('.add-cart');

 let products = [
 {
	 name: 'Spinach',
	 tag: 'spinach',
	 price: '8.70',
	 inCart: 0
 },
  {
	 name: 'Broccoli',
	 tag: 'broccoli',
	 price: '12.50',
	 inCart: 0
 },
  {
	 name: 'Cabbage',
	 tag: 'cabbage',
	 price: '10.50',
	 inCart: 0
 },
  {
	 name: 'Apple',
	 tag: 'apple',
	 price: '6.50',
	 inCart: 0
 },
 {
	 name: 'Tomato',
	 tag: 'cucumber',
	 price: '4.50',
	 inCart: 0
 },
 {
	 name: 'Watermelon',
	 tag: 'watermelon',
	 price: '20.00',
	 inCart: 0
 },
   {
	 name: 'BakedBread',
	 tag: 'freshlybakedbread',
	 price: '1.00',
	 inCart: 0
 },
   {
	 name: 'bakedbread',
	 tag: 'ChoclateBread',
	 price: '40.00',
	 inCart: 0
 },
 ];

for(let i = 0; i< carts.length; i++)
{
carts[i].addEventListener('click' ,()=> {
cartNumbers(products[i]);
totalCost(products[i]);
});
}


function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');
	if(productNumbers){
		document.querySelector('.cart button').textContent = productNumbers;
	}
}

function cartNumbers(product, action)
{
	//console.log("The product clicked", product);
let productNumbers = localStorage.getItem('cartNumbers');
productNumbers = parseFloat(productNumbers);

let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

  if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart button').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart button').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart button').textContent = 1;
    }
    setItems(product);
}

function setItems(product)
{
	let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseFloat(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	
	if(cartItems != null) {
		
		let currentProduct = product.tag;
		
		if(cartItems[currentProduct] == undefined) {
			      cartItems = {
					  ...cartItems,
					  [currentProduct]: product
				  }
		}

		cartItems[currentProduct].inCart += 1;
		
	} else {
    product.inCart = 1;
     cartItems = {
    [product.tag]: product
     };
	}
localStorage.setItem('productsInCart', JSON.stringify(cartItems));	
}


function totalCost( product, action )  {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseFloat(cart);

        localStorage.setItem("totalCost", parseFloat(cart) - parseFloat(product.price));
    } else if(cart != null) {
        
        cart = parseFloat(cart);
        localStorage.setItem("totalCost", parseFloat(cart) + parseFloat(product.price));
    
    } else {
        localStorage.setItem("totalCost", parseFloat(product.price));
    }
}


function displayCart() {
	
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	
	let cart = localStorage.getItem("totalCost");
	cart = parseFloat(cart);
	
	let productContainer = document.querySelector(".products");
	
	console.log(cartItems);
	if(cartItems && productContainer) {
	
	productContainer.innerHTML = '';
	
	Object.values(cartItems).map((item, index) => {
	
	productContainer.innerHTML += `
	
	<div class = "product">
	<ion-icon name="close-circle"></ion-icon>
	<img src="${item.tag}.jpg"/>
	<span  class="sm-hide">${item.name}</span>
	</div>
	<div class="price sm-hide">$${item.price}</div>
	<div class="quantity">
	<ion-icon class="decrease" name="remove"></ion-icon>
	<span>${item.inCart}</span>
	<ion-icon class = "increase" name="add"></ion-icon>
	</div>
	<div class="total">
	$${item.inCart * item.price}
	</div>
	`;	
	});
	
	productContainer.innerHTML += `
	<div class="basketTotalContainer">
	<h4 class = "basketTotalTitle">Basket Total</h4>
	<h4 class="basketTotal">${cart}</h4>
	`
	
	deleteButtons();
	manageQuantity();
	}
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        });
    }
}
onLoadCartNumbers();
displayCart();

function showCatDiv(cat) {
    if(cat == 'all'){
        $('.bread').show();
        $('.Dairy').show();
        $('.Vegetables').show();
        $('#all').addClass('active');
    }
    else if(cat == 'bread'){
        $('.bread').show();
        $('.Dairy').hide();
        $('.Vegetables').hide();
        $('#all').removeClass('active');
        $('#bread').addClass('active');
        $('#Dairy').removeClass('active');
        $('#Vegetables').removeClass('active');
    }
    else if(cat == 'Dairy'){
        $('.bread').hide();
        $('.Dairy').show();
        $('.Vegetables').hide();
        $('#all').removeClass('active');
        $('#bread').removeClass('active');
        $('#Dairy').addClass('active');
        $('#Vegetables').removeClass('active');
    }
    else if(cat == 'Vegetables'){
        $('.bread').hide();
        $('.Dairy').hide();
        $('.Vegetables').show();
        $('#all').removeClass('active');
        $('#bread').removeClass('active');
        $('#Dairy').removeClass('active');
        $('#Vegetables').addClass('active');
    }
}