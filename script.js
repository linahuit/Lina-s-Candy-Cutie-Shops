class ShoppingCart {
    constructor() {
      this.cart = [];
      this.addToCartButtons = document.querySelectorAll(".add-to-cart");
      this.cartItems = document.querySelector(".cart-items");
      this.totalElement = document.querySelector(".total");
      this.checkoutButton = document.querySelector(".checkout");
      this.overlay = document.querySelector(".overlay");
      this.checkoutForm = document.querySelector(".checkout-form");
      this.cancelButton = document.querySelector(".cancel");
  
      this.initialize();
    }
  
    initialize() {
      this.addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
          this.addToCart(button);
        });
      });
  
      this.checkoutButton.addEventListener("click", () => {
        this.showCheckoutForm();
      });
  
      this.checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();
        this.processCheckout();
      });
  
      this.cancelButton.addEventListener("click", () => {
        this.hideCheckoutForm();
      });
    }
  
    addToCart(button) {
      const product = button.parentNode;
      const title = product.querySelector(".item-title").textContent;
      const price = parseFloat(product.querySelector(".item-price").textContent.slice(1));
  
      const existingItem = this.cart.find((item) => item.title === title);
  
      if (existingItem) {
        existingItem.quantity++;
        existingItem.total += price;
      } else {
        const item = {
          title: title,
          price: price,
          quantity: 1,
          total: price,
        };
        this.cart.push(item);
      }
  
      this.updateCart();
    }
  
    updateCart() {
      this.cartItems.innerHTML = "";
      let cartTotal = 0;
  
      this.cart.forEach((item) => {
        const cartItem = document.createElement("li");
        cartItem.textContent = `${item.title} (Quantity: ${item.quantity}) - ₱${item.total.toFixed(2)}`;
  
        const removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
          this.removeItemFromCart(item);
        });
  
        cartItem.appendChild(removeButton);
        this.cartItems.appendChild(cartItem);
        cartTotal += item.total;
      });
  
      this.totalElement.textContent = `₱${cartTotal.toFixed(2)}`;
    }
  
    removeItemFromCart(item) {
      const itemIndex = this.cart.findIndex((cartItem) => cartItem.title === item.title);
      if (itemIndex !== -1) {
        this.cart.splice(itemIndex, 1);
        this.updateCart();
      }
    }
  
    showCheckoutForm() {
      this.overlay.style.display = "flex";
    }
  
    hideCheckoutForm() {
      this.overlay.style.display = "none";
    }
  
    processCheckout() {
      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const address = document.querySelector("#address").value;
  
      if (name && email && address) {
        // Perform checkout logic here, e.g., send order details to a server
        alert("Order placed successfully!");
        this.cart = [];
        this.updateCart();
        this.hideCheckoutForm();
      } else {
        alert("Please fill in all the fields.");
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    new ShoppingCart();
  });
  