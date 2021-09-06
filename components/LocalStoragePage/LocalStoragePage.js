class LocalStorageProducts {
   constructor() {
      this.products = 'products';
   }
   removeProduct(id) {
      this.setProducts(id)
   }
   getProducts() {
      const products = localStorage.getItem(this.products)
      if (products != null) {
         return JSON.parse(products) // возвращается массив с продуктами
      }
      return [];
   }
   setProducts(productId) {
      const products = this.getProducts();
      let indexProducts = products.indexOf(productId);
      let statusProduct = false;
      if (indexProducts == -1) {
         products.push(productId);
         statusProduct = true;
      } else {
         products.splice(indexProducts, 1);
      }
      localStorage.setItem(this.products, JSON.stringify(products)); // пушим массив, превращенный в строку
      return { products, statusProduct } // возвращается статус продукта и все продукты
   }
};

export default LocalStorageProducts;