class Basket {
   constructor(basketPage, products, localStoragePage, cardIcon) {
      this.basketPage = document.querySelector(basketPage);
      this.products = products
      this.localStoragePage = localStoragePage;
      this.cardIcon = cardIcon;
      this.render();
   }
   removeProduct(e) {
      const btnRemove = e.currentTarget;
      const productId = btnRemove.closest('.basket__tr').dataset.id;
      this.localStoragePage.removeProduct(productId);
      this.render();
   }
   countPrice(e) {
      const input = e.currentTarget;
      const price = input.closest('.basket__tr').querySelector('[data-type="price"]')
      console.log(price)
      const totalPriceProduct = input.closest('.basket__tr').querySelector('[data-type="total"]');
      totalPriceProduct.innerHTML = +price.innerText * input.value;
      this.totalPrice();
   }
   totalPrice() {
      const totalPrice = document.querySelector('[data-type="total-price"]');
      if (totalPrice) {
         const totalPriceProduct = document.querySelectorAll('[data-type="total"]')
         let total = 0;
         totalPriceProduct.forEach(price => total += +price.innerText);
         totalPrice.innerHTML = total.toFixed(2);
      }
   }
   #setup() {
      const inputs = document.querySelectorAll('.quantity');
      const removeBtn = document.querySelectorAll('[data-type="remove-product-btn"]');
      inputs.forEach(input => input.addEventListener('input', (e) => this.countPrice(e)))
      removeBtn.forEach(btn => btn.addEventListener('click', (e) => this.removeProduct(e)))
   }
   render() {
      let productItem = ``;
      let checkProducts = this.localStoragePage.getProducts()
      this.products.forEach(({ id, title, price, image }) => {
         if (checkProducts.indexOf(id) != -1) {
            let total = price;
            productItem += `
            <tr class="basket__tr" data-id="${id}">
               <td>
                  <div class="card-info flex">
                     <img src="${image}" alt="product">
                     <div class="card-info__content flex">
                        <p>${title}</p>
                        <small>Price: <span data-type="price">${price}</span></small>
                        <a data-type="remove-product-btn" href="#">Remove</a>
                     </div>
                  </div>
               </td>
               <td>
                  <input type="number" class="quantity" min="1" value="1">
               </td>
               <td data-type='total'>
                  ${total}
               </td>
            </tr>`
         }
      });
      let basket = `
      <table class="basket__table">
         <tr class="basket__tr">
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
         </tr>
            ${productItem}
      </table > `;
      if (this.basketPage) {
         this.basketPage.innerHTML = basket;
      }
      this.totalPrice();
      this.#setup();
      this.cardIcon.render();
   }
}

export default Basket
