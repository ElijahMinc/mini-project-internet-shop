class CardIcon {
   constructor(cardIconPage, locaclStoragePage) {
      this.cardIconPage = document.querySelector(cardIconPage);
      this.LocalStoragePage = locaclStoragePage;
      this.render();
   }
   get productsLocal() {
      return this.LocalStoragePage.getProducts();
   }
   render() {
      const products = this.productsLocal;
      let cardIcon = `
      <span class="basket-count__item">${products.length}</span>
      `;
      this.cardIconPage.innerHTML = cardIcon;
   }
}

export default CardIcon;