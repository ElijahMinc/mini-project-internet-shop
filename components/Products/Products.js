class Products {
   constructor(
      getProducts, // products
      localStoragePage, // localStorage
      cardIcon, // iconCard
      filterCategories,
      filterAllProducts,
      filterLatest,
      filterRecent,
      filterBtn) {
      this.getProducts = getProducts;
      this.localStoragePage = localStoragePage; //local Storage
      this.cardIcon = cardIcon;
      this.filterCategories = document.querySelector(filterCategories);
      this.filterLatest = document.querySelector(filterLatest);
      this.filterRecent = document.querySelector(filterRecent);
      this.filterAllProducts = document.querySelector(filterAllProducts);
      this.filterBtn = document.querySelectorAll(filterBtn);
      this.latest = 'latest';
      this.recent = 'recent';
      this.renderProductsCategory(this.latest);
      this.renderProductsCategory(this.recent);
      this.render(this.filterAllProducts, getProducts);
   }
   get variables() {// нужные переменные
      return {
         add: 'Add',
         classAdded: 'checkout',
         remove: 'added',
      }
   }
   // getProducts 
   async filter(category) {
      const products = this.getProducts; // список продуктов
      const categoryFilter = products.filter(product => product.category === category);
      return categoryFilter;
   }
   async renderProductsCategory(category) { // рендер при загрузке страницы товары
      const filterlatest = await this.filter(category);
      const filterRecent = await this.filter(category);
      this.render(this.filterLatest, filterlatest);
      this.render(this.filterRecent, filterRecent);
      this.#setup();
   }
   async filteringProducts(productCategory) { // рендер отфильтрованных карточек товаров
      this.render(this.filterCategories, productCategory);
   }
   #handleFilterCategory(event) { // при клике на определенную категорию рендерятся нужные карточки
      const btn = event.currentTarget;
      const btnId = btn.dataset.id;
      this.filterBtn.forEach(btn => btn.classList.remove('active'));
      btn.classList.add('active');
      this.idCategory = btnId;
      this.filter(btnId)
         .then(productCategory => {
            this.filteringProducts(productCategory);
         }).then(() => {
            this.#searchBtnsAddToCard();
         })
   }
   #searchBtnsAddToCard() { // поиск тех карточек, которые были отфильтрованы по клику на определенную категорию
      const btnsAddToCard = this.filterCategories.querySelectorAll('[data-type="add-to-card"]');
      this.#setupHandleAddToCard(btnsAddToCard);
   }
   #setupHandleAddToCard(cardBtns) { // слушатель события на кнопки "добавить в корзину"
      cardBtns.forEach(btn => btn.onclick = (event) => this.#handleAddToCard(event));
   }
   #handleAddToCard(event) {//кнопка добавить в корзину
      event.preventDefault();
      const { add, remove } = this.variables;
      const iconBtnBasket = event.currentTarget;
      const btn = iconBtnBasket.closest('.filter-products__item').querySelector('[data-type="status"]');
      const product = iconBtnBasket.closest('.filter-products__item');
      const idProduct = product.dataset.id;
      const { products, statusProduct } = this.localStoragePage.setProducts(idProduct)
      if (statusProduct) {
         document.querySelectorAll(`[data-id="${idProduct}"]`).forEach(product => {
            product.querySelector('[data-type="status"]').innerHTML = remove;
            product.classList.add('checkout')
         });
      } else {
         document.querySelectorAll(`[data-id="${idProduct}"]`).forEach(product => {
            product.querySelector('[data-type="status"]').innerHTML = add;
            product.classList.remove('checkout')
         });
      }
      this.cardIcon.render();
   }
   #setup() {// установка обработчиков событий
      const cardBtns = document.querySelectorAll('[data-type="add-to-card"]');
      this.#setupHandleAddToCard(cardBtns);
      this.filterBtn.forEach(btn => btn.addEventListener('click', (event) => this.#handleFilterCategory(event, cardBtns)));
   }
   render(positionBlock, productsCategory) { // рендер карточек товаров
      let productsHtml = ``;
      const { add, remove } = this.variables;
      productsCategory.forEach(({ id, title, price, image }) => {
         const products = this.localStoragePage.getProducts();
         let statusBtn = ``;
         let statusClass = '';
         if (products.indexOf(id) != -1) {
            statusBtn = remove;
            statusClass = 'checkout';
         } else {
            statusBtn = add;
            statusClass = ``;
         }
         productsHtml += `
               <div class="filter-products__item ${statusClass}" data-id="${id}">
                  <div class="filter-products__img">
                     <img src="${image}" alt="trending product">
                  </div>
                  <div class="filter-products__content">
                     <h3 class="filter-products__title">${title}</h3>
                     <div class="filter-products__stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                     </div>
                     <div class="filter-products__price">
                        ${price}
                     </div>
                  </div>
                  <div class="filter-products__btn" data-type="status">${statusBtn}</div>
                  <ul class="filter-products__list">
                     <li class="filter-products__list-item">
                        <a href="#" class="filter-products__list-link">
                           <i class="far fa-eye"></i>
                        </a>
                     </li>
                     <li class="filter-products__list-item">
                        <a href="#" class="filter-products__list-link">
                           <i class="far fa-heart"></i>
                        </a>
                     </li>
                     <li class="filter-products__list-item">
                        <a href="##" class="filter-products__list-link" data-type="add-to-card">
                           <i class="fas fa-shopping-basket"></i>
                        </a>
                     </li>
                  </ul>
               </div>  
               `;
      });
      if (positionBlock) {
         positionBlock.innerHTML = productsHtml;
      }
   };
};
export default Products;


