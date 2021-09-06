import getProducts from '../utils/getProducts.js';
import Preload from '../components/Preload/Preload.js'; // preloader
import Error from '../components/Error/Error.js'; // Error
import LocalStorageProducts from './../components/LocalStoragePage/LocalStoragePage.js';// localStorageProducts
import Products from './../components/Products/Products.js';//display and filter products
import CardIcon from '../components/BasketIcon/CardIcon.js'; // icon basket
import Basket from '../components/Basket/Basket.js'; // Basket

const preloadPage = new Preload('#preload');
const errorPage = new Error('#error');

const renderProducts = (products) => {
   const localStoragePage = new LocalStorageProducts();
   const cardIcon = new CardIcon(
      '#basketCount',
      localStoragePage);
   const productsPage = new Products(
      products,
      localStoragePage,
      cardIcon,
      '[data-type="all-filter"]',
      '[data-type="all-products"]',
      '[data-type="latest"]',
      '[data-type="recent"]',
      '.filter-btn');
   const basketPage = new Basket(
      '#basket',
      products,
      localStoragePage,
      cardIcon);
}

!async function render() {
   const products = await getProducts();

   if (products.statusError) {
      preloadPage.removeRender();
      errorPage.render(products.error);
   } else {
      setTimeout(() => {
         preloadPage.removeRender();
         renderProducts(products);
      }, 2000)
   }
}()




