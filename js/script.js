document.addEventListener("DOMContentLoaded", function () {
    const cart = [];

    // Add event listener to each "Add to Cart" button
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.parentElement;
            
            // Extract product name and price from the DOM
            const productName = this.getAttribute("data-name");
            const productPrice = parseFloat(this.getAttribute("data-price"));

            // Add product to the cart
            cart.push({ name: productName, price: productPrice });

            // Alert user and log cart content to the console
            alert(productName + " has been added to the cart!");
            console.log(cart);

            // Update the cart display
            updateCart();
        });
    });

    // Function to update the cart
    function updateCart() {
        const cartItems = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");

        // Clear the current cart content
        cartItems.innerHTML = "";
        let total = 0;

        // Add each item to the cart display
        cart.forEach(item => {
            let li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price;
        });

        // Update the total price
        cartTotal.textContent = total.toFixed(2);
    }

    // Checkout button functionality
    document.getElementById("checkout").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Proceeding to checkout...");
        cart.length = 0;  // Empty the cart
        updateCart();
    });
});

const fetch = require('node-fetch');

app.post('/mpesa-payment', async (req, res) => {
  const { amount, phoneNumber } = req.body;

  const mpesaApiUrl = 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
  
  const response = await fetch(mpesaApiUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + YOUR_ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      BusinessShortcode: 'YOUR_SHORTCODE',
      LipaNaMpesaOnlineShortcode: 'YOUR_SHORTCODE',
      LipaNaMpesaOnlineShortcodeKey: 'YOUR_SHORTCODE_KEY',
      PhoneNumber: phoneNumber,
      Amount: amount,
      AccountReference: 'Payment Reference',
      TransactionDesc: 'Payment for Merchandise',
      CallBackURL: 'https://yourwebsite.com/callback',
      CommandID: 'Buy Goods',
      LipaNaMpesaOnlineCommand: '1',
      shortcode: 'YOUR_SHORTCODE',
    })
  });

  const data = await response.json();
  res.json(data);
});

let headers = new Headers();
headers.append("Authorization", "Basic ZkczcXp3ZVpzRHdMTDB5aGROOVhsSDVTU0hQUnBndXptNGswN0JnSlczUkdJQTJTOkFueDFDYkVPUTJYM3lKbkdISURFOGtjRHdOMkRKdDQzRkY4anoyelR2QlpmTTJoWllaSzBIT3FvaHRpWFQ4bGM=");
fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", { headers })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log(error));