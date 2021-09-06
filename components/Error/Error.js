class Error {
   constructor(errorPage) {
      this.errorPage = document.querySelector(errorPage);
   }
   render(error) {
      let errorHtml = `
      <div class="error__body">
         <img src="img/images/error.jpg" alt="error">
         <p class="error__text">Пожалуйста, посетите сайт позже. У данных сейчас трудный период (Ошибка: ${error})</p>
      </div>
      `;
      document.querySelector('body').style.overflow = 'hidden';
      this.errorPage.classList.add('_show');
      this.errorPage.innerHTML = errorHtml;
   }
}

export default Error;